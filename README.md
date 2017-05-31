# seeql

<img src="logo.png" alt="logo" align="right"/>

[![Travis build status](http://img.shields.io/travis/gajus/seeql/master.svg?style=flat-square)](https://travis-ci.org/gajus/seeql)
[![Coveralls](https://img.shields.io/coveralls/gajus/seeql.svg?style=flat-square)](https://coveralls.io/github/gajus/seeql)
[![NPM version](http://img.shields.io/npm/v/seeql.svg?style=flat-square)](https://www.npmjs.org/package/seeql)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Real-time SQL profiler.

> Hello all!
>
> I've created SeeQL for to enable real-time debugging of applications. SeeQL is extremely handy for identifying slow queries as you navigate the application. It acts as a transparent proxy, therefore 0 changes need to be done to the code base to use it. It basically allows you to see what queries are being executed, their response time, row count, etc.
>
> **I am looking for contributors who are equally passionate about using MySQL in Node.js to help further develop this project.** I've opened a few simple issues to pick up if anyone wants to give it a shot!

![Demo](https://rawgit.com/gajus/seeql/master/demo.gif)

## How to use it?

1. Start `seeql` and configure it to talk with the application database.
2. Configure application to connect to `seeql` service.

## CLI

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
