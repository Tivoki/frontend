import assert from 'node:assert/strict';
import { test } from 'node:test';
import { backoffDelay, SseParser } from './parse-sse.ts';

test('parses events split across chunks and ignores comments', () => {
  const parser = new SseParser();
  assert.deepEqual(parser.push(': hello\n\nevent: ready\ndata: {"a"'), []);
  assert.deepEqual(parser.push(':1}\n\nevent: ping\r\ndata: {}\r\n\r\n'), [
    { event: 'ready', data: '{"a":1}', id: undefined },
    { event: 'ping', data: '{}', id: undefined },
  ]);
});

test('joins multi-line data and keeps ids', () => {
  const parser = new SseParser();
  assert.deepEqual(parser.push('id: 7\ndata: a\ndata: b\n\n'), [
    { event: 'message', data: 'a\nb', id: '7' },
  ]);
});

test('backoff grows, is jittered and capped', () => {
  for (let attempt = 0; attempt < 10; attempt++) {
    const delay = backoffDelay(attempt, 1000, 30_000);
    const ceiling = Math.min(30_000, 1000 * 2 ** attempt);
    assert.ok(delay >= ceiling / 2 && delay <= ceiling);
  }
});
