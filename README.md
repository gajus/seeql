# seeql

[![Travis build status](http://img.shields.io/travis/gajus/seeql/master.svg?style=flat-square)](https://travis-ci.org/gajus/seeql)
[![Coveralls](https://img.shields.io/coveralls/gajus/seeql.svg?style=flat-square)](https://coveralls.io/github/gajus/seeql)
[![NPM version](http://img.shields.io/npm/v/seeql.svg?style=flat-square)](https://www.npmjs.org/package/seeql)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Real-time SQL profiler.

```bash
npm install seeql -g

seeql --help

Options:
  --help               Show help                                       [boolean]
  --database-host      Target database host. Seeql will connect to this database
                       and proxy all incoming queries.       [string] [required]
  --database-database                                        [string] [required]
  --database-password                                        [string] [required]
  --database-user                                            [string] [required]
  --service-port                                        [number] [default: 3306]
```

![Demo](https://rawgit.com/gajus/seeql/master/demo.gif)
