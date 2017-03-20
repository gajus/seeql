// @flow

import test from 'ava';
import formatSql from '../../src/formatSql';

test('formats multiline SQL into a single string', (t) => {
  t.true(formatSql('foo\nbar') === 'foo bar');
});
