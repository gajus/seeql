// @flow

import yargs from 'yargs';
import mysql from 'mysql2';
import createDebug from 'debug';
import prettyHrtime from 'pretty-hrtime';
import createDatabaseConnectionConfiguration from './createDatabaseConnectionConfiguration';
import formatSql from './formatSql';

const debug = createDebug('seeql');

const argv = yargs
  .env('SEEQL')
  .help()
  .strict()
  .options({
    'database-database': {
      demand: true,
      type: 'string'
    },
    'database-host': {
      demand: true,
      description: 'Target database host. Seeql will connect to this database and proxy all incoming queries.',
      type: 'string'
    },
    'database-password': {
      demand: true,
      type: 'string'
    },
    'database-user': {
      demand: true,
      type: 'string'
    },
    'service-port': {
      default: 3306,
      type: 'number'
    },
    'use-screen': {
      default: true,
      type: 'boolean'
    }
  })
  .argv;

let screen;
let table;

if (argv.useScreen) {
  const blessed = require('blessed');
  const contrib = require('blessed-contrib');

  screen = blessed.screen({
    smartCSR: true
  });

  screen.key(['escape', 'q', 'C-c'], () => {
    // eslint-disable-next-line no-process-exit
    return process.exit(0);
  });

  table = contrib.table({
    columnSpacing: 5,
    columnWidth: [
      15,
      15,
      50,
      10,
      30
    ],
    fg: 'white',
    height: '80%',
    interactive: true,
    keys: true,
    label: null,
    selectedBg: 'blue',
    selectedFg: 'white',
    width: '80%'
  });

  table.focus();

  screen.append(table);

  screen.render();
}

const server = mysql.createServer();

const drawTable = (drawQueries) => {
  table.setData({
    data: drawQueries.map((query) => {
      return [
        query.connectionId,
        query.queryId,
        formatSql(query.sql).slice(0, 50),
        query.rows.length,
        prettyHrtime(query.executionTime)
      ];
    }),
    headers: [
      'Connection ID',
      'Query ID',
      'SQL',
      'Row count',
      'Execution time'
    ]
  });

  screen.render();
};

let connectionId = 0;
let queryId = 0;

const queries = [];

const ClientFlags = require('mysql2/lib/constants/client.js');

server.on('connection', (connection) => {
  debug('received client connection request');

  connection.serverHandshake({
    capabilityFlags: 0xffffff ^ ClientFlags.COMPRESS,
    characterSet: 8,
    connectionId: connectionId++,
    protocolVersion: 10,
    serverVersion: '5.6.10',
    statusFlags: 2
  });

  const remote = mysql.createConnection(createDatabaseConnectionConfiguration(argv));

  connection.on('error', (error) => {
    debug('connection error', error.message);
  });

  connection.on('field_list', (targetTable, fields) => {
    debug('field_list', targetTable, fields);

    connection.writeEof();
  });

  connection.on('query', (sql) => {
    queryId++;

    const start = process.hrtime();

    debug('received query', sql);

    remote.query(sql, (queryError, rows, fields) => {
      if (queryError) {
        throw new Error('Unexpected error.');
      }

      const end = process.hrtime(start);

      debug('received response from the remote database in %s', prettyHrtime(end), rows, fields);

      queries.push({
        connectionId,
        executionTime: end,
        fields,
        queryId,
        rows,
        sql
      });

      if (argv.useScreen) {
        drawTable(queries);
      }

      if (Array.isArray(rows)) {
        connection.writeTextResult(rows, fields);
      } else {
        connection.writeOk(rows);
      }
    });
  });

  connection.on('end', () => {
    remote.end();
  });
});

server.listen(argv.servicePort, () => {
  debug('server listening on port %d', argv.servicePort);
});
