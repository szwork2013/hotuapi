/* jshint -W079 */
'use strict';

var nconf = require('nconf');

nconf
  .file({
    file: __dirname + '/config.json'
  })
  .env();

nconf.defaults({
  'ENVIRONMENT': 'develop',
  'LOGGLY': false,

  'HTTP_SERVER': true, // Serve http/json api
  'PORT': 9101, // Port of http api server
  'HOST': '0.0.0.0',

  // cookie
  'COOKIE_SECRET': 'nodejs-credits-cookie-secret',
  'COOKIE_MAX_AGE': 1000 * 60 * 60 * 24 * 360, // 360 day
  'COOKIE_KEY': 'connect.sid',

  // mongodb
  'DB_HOST': '127.0.0.1',
  'DB_NAME': 'hotu-api',
  'DB_PORT': 27017,

  // weixin
  'WEIXIN_TOKEN': '6G9IH7EF4D83C5AB',
  'WEIXIN_APP_ID': 'wx2b66f49eb82d70de',
  'WEIXIN_APP_SECRET': '2a2b14ff91dd5b156fc263a8f05c24c8',
  'WEIXIN_ENCODING_AES_KEY': 'ZvhDvkQ8QpRUvNZUQgDRvrU3ICQEBVEdLvEsmsXTscA',
  'XS_DOMAIN': 'http://localhost:1234'
});

module.exports = nconf;