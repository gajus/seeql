// @flow

import test from 'ava';
import formatSql from '../../src/formatSql';

test('formats multiline SQL into a single string', (t) => {
  t.true(formatSql('foo\nbar\nbaz') === 'foo bar baz');
});

test('replaces tabs with spaces', (t) => {
  t.true(formatSql('foo\tbar\tbaz') === 'foo bar baz');
});

test('replaces multiple consequent spaces with a single space', (t) => {
  t.true(formatSql('foo   bar   baz') === 'foo bar baz');
});
