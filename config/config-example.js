/* jshint -W079 */

var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  "ENVIRONMENT": "production",  
  "LOGGLY": false,

  "HTTP_SERVER": true, // Serve http/json api
  "PORT": 9001, // Port of http api server
  "HOST": "0.0.0.0",

  // cookie 
  "COOKIE_SECRET": "nodejs-credits-cookie-secret",
  "COOKIE_MAX_AGE": 1000 * 60 * 60 * 24 * 360, // 360 day
  "COOKIE_KEY": "connect.sid",

  // mongodb
  "DB_HOST": "127.0.0.1",
  "DB_NAME": "hotu",
  "DB_PORT": 27017,

  // weixin
  "WEIXIN_TOKEN": "",
  "WEIXIN_APP_ID": "",
  "WEIXIN_APP_SECRET": "",
  "WEIXIN_ENCODING_AES_KEY": "",


  // domains
  "XS_DOMAIN": "localhost:9000"
  
});

module.exports = nconf;
