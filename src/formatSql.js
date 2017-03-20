// @flow

import _ from 'lodash';

export default (sql: string): string => {
  return _.trim(sql
    .replace(/\n/g, ' ')
    .replace(/ +/, ' ')).slice(0, 50);
};
