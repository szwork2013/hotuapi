var config = require('../../config/config');
var crypto = require('crypto');
var async = require("async");
var wechat = require('wechat');
var utils = require('./utils');
var WechatApi = require('wechat-api');
var OAuth = require('wechat-oauth');

var client = new OAuth(config.get('WEIXIN_APP_ID'), config.get('WEIXIN_APP_SECRET'));

var api = new WechatApi(
  config.get('WEIXIN_APP_ID'),
  config.get('WEIXIN_APP_SECRET'),
  utils.getToken,
  utils.saveToken
);
api.registerTicketHandle(utils.getTicketToken, utils.saveTicketToken);

/** js-sdk */
exports.sign = function (req, res) {
  var url = decodeURIComponent(req.query.url);
  var param = {
    debug: false,
    jsApiList: ['scanQRCode', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'],
    url: url
  };

  api.getJsConfig(param, function (err, result) {
    if (err) {
      return res.json({
        ret: 1
      });
    }
    return res.json({
      ret: 0,
      config: result
    });
  });
};

exports.getopenid = function (req, res) {
  var code = req.query.code;
  if (code) {
    client.getAccessToken(code, function (err, result) {
      console.log(arguments,'ssss');
      if (result.data) {
        res.json(result.data);
      } else {
        res.json(arguments);
      }
    });
  } else {
    res.json({
      'msg': 'no code'
    });
  }
};

// exports.getopenids = function (req, res) {
//   var code = req.query.code;
//   if (code) {
//     client.getAccessToken(code, function (err, result) {
//       if (result.data) {
//         res.json(result.data);
//       } else {
//         res.json(arguments);
//       }
//     });
//   } else {
//     res.json({
//       'msg': 'no code'
//     });
//   }
// };


function sha1(str) {
  var md5sum = crypto.createHash('sha1');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

/* GET users listing. */
exports.validate = function (req, res) {
  var signature = req.param('signature');
  var echostr = req.param('echostr');
  var valid_params = [
    req.param('timestamp'),
    req.param('nonce'),
    config.get("WEIXIN_TOKEN")
  ];
  valid_params.sort();

   
  var cal_signature = sha1(valid_params.join('')); 
  if (signature == cal_signature) {  
    res.send(echostr); 
  } else {  
    res.send("Bad Token!"); 
  }
};


var wxconfig = {
  token: config.get('WEIXIN_TOKEN'),
  appid: config.get('WEIXIN_APP_ID'),
  encodingAESKey: config.get('WEIXIN_ENCODING_AES_KEY')
};

/** 公众号消息 */
exports.chat = wechat(wxconfig).text(function (message, req, res, next) {
  res.reply();
}).image(function (message, req, res, next) {
  res.reply();
}).voice(function (message, req, res, next) {
  res.reply();
}).video(function (message, req, res, next) {
  res.reply();
}).location(function (message, req, res, next) {
  res.reply();
}).link(function (message, req, res, next) {
  res.reply();
}).event(function (message, req, res, next) {
  res.reply();
}).middlewarify();
