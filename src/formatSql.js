// @flow

import {
  trim
} from 'lodash';

export default (sql: string): string => {
  let formattedSql: string;

  formattedSql = sql
    .replace(/\n/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/ +/g, ' ');

  formattedSql = trim(formattedSql);

  return formattedSql;
};
