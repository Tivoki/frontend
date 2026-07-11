import { readFileSync } from 'node:fs';
import { GoogleGenAI } from '@google/genai';
import { Octokit } from '@octokit/rest';

async function runReview(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;
  const prNumberStr = process.env.PR_NUMBER;
  const repository = process.env.REPOSITORY;

  if (
    typeof apiKey !== 'string' ||
    typeof githubToken !== 'string' ||
    typeof prNumberStr !== 'string' ||
    typeof repository !== 'string'
  ) {
    throw new Error('Missing required environment variables');
  }

  const prNumber = parseInt(prNumberStr, 10);
  if (Number.isNaN(prNumber)) {
    throw new Error('PR_NUMBER is not a valid integer');
  }

  const repoParts = repository.split('/');
  if (repoParts.length !== 2) {
    throw new Error('Invalid REPOSITORY format');
  }
  const owner = repoParts[0];
  const repo = repoParts[1];

  if (typeof owner !== 'string' || typeof repo !== 'string') {
    throw new Error('Failed to parse owner and repo');
  }

  let diffContent = readFileSync('pr_diff.txt', 'utf-8');
  if (diffContent.trim() === '') {
    return;
  }

  const MAX_DIFF_LENGTH = 300_000;
  if (diffContent.length > MAX_DIFF_LENGTH) {
    diffContent = `${diffContent.slice(0, MAX_DIFF_LENGTH)}\n\n... [diff обрізано: занадто великий PR]`;
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Do a code review of this Pull Request diff.
    Point out potential bugs, performance issues, or violations of clean code principles.
    Reply in Markdown format.
    
    Diff:
    ${diffContent}`;

  const model = process.env.GEMINI_MODEL ?? 'gemini-3.5-flash';
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  const reviewText = response.text;
  if (typeof reviewText !== 'string' || reviewText.trim() === '') {
    throw new Error('Failed to generate review content');
  }

  const octokit = new Octokit({ auth: githubToken });

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: reviewText,
  });
}

runReview().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('An unknown error occurred');
  }
  process.exit(1);
});
