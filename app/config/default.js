'use strict'
const Boom = require('boom')
const path = require('path')

let config = {}
const Pack = require('./../../package')

config.web = {
  name: Pack.name,
  swagger: {
    host: 'https://apidoan.herokuapp.com:9002',
    schemes: ['http']
  },
  connection: {
    port: 9002,
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*'],
        credentials: true
      }
    }
  },
  db: {
    uri: 'mongodb://cvthang56th2:Tdymncg1996@ds121282.mlab.com:21282/cvthang'
  },
  redisOptions: {
    host: '127.0.0.1', // 13.228.4.248
    port: 6379,
    detect_buffers: true,
    prefix: Pack.name + ':'
  }
}

module.exports = config
