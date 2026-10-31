import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mergeBySeq, newestSeq, visiblePending } from './history-merge.ts';
import { isCanonicalInboxTab, normalizeInboxTab, normalizeSearch } from './inbox-tabs.ts';

test('legacy tabs map to the new filters', () => {
  assert.equal(normalizeInboxTab('open'), 'active');
  assert.equal(normalizeInboxTab('pending'), 'waiting');
  assert.equal(normalizeInboxTab('resolved'), 'closed');
  assert.equal(normalizeInboxTab('escalated'), 'escalated');
  assert.equal(normalizeInboxTab('bogus'), 'all');
  assert.equal(normalizeInboxTab(undefined), 'all');
  assert.equal(isCanonicalInboxTab('resolved'), false);
  assert.equal(isCanonicalInboxTab('waiting'), true);
});

test('search needs 3 characters unless it is a conversation id', () => {
  assert.equal(normalizeSearch('  ab '), undefined);
  assert.equal(normalizeSearch(' anna '), 'anna');
  assert.equal(normalizeSearch('cmvwho24o0013217d0v0jyqcq'), 'cmvwho24o0013217d0v0jyqcq');
  assert.equal(normalizeSearch('x'.repeat(150))?.length, 100);
});

test('merge dedupes by id and orders by seq', () => {
  const a = [
    { id: 'a', seq: 1 },
    { id: 'c', seq: 3 },
  ];
  const merged = mergeBySeq(a, [
    { id: 'b', seq: 2 },
    { id: 'c', seq: 3 },
    { id: 'd', seq: 4 },
  ]);
  assert.deepEqual(
    merged.map((m) => m.id),
    ['a', 'b', 'c', 'd'],
  );
  assert.equal(newestSeq(merged), 4);
  assert.equal(mergeBySeq(a, []), a);
});

test('a canonical message (SSE before HTTP) replaces its pending bubble', () => {
  const pending = [
    { clientMessageId: 'x', content: 'hi', status: 'sending' as const },
    { clientMessageId: 'y', content: 'yo', status: 'failed' as const },
  ];
  assert.deepEqual(
    visiblePending(pending, [{ clientMessageId: 'x' }, { clientMessageId: null }]).map(
      (p) => p.clientMessageId,
    ),
    ['y'],
  );
});
