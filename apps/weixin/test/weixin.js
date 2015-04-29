var config = require('../../config/config');
var wechat = require('wechat');
var TOKEN = config.get('WEIXIN_TOKEN');

var wechat = require('wechat');
var express = require('express');
var router = express.Router();
var WechatApi = require('wechat-api');

var api = new WechatApi(config.get('WEIXIN_APP_ID'), config.get('WEIXIN_APP_SECRET'));

router.route('/sign')
.get(function(req, res) {
    var url = decodeURIComponent(req.query.url);
    var param = {
     debug:false,
     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
     url:url 
    };
    console.log('###param:', param);
    api.getJsConfig(param, function(err, result){
	console.log('getJsConfig', err, result);
        if(err){
            return res.json({ret:1});
        }
        console.log(url, result);
        return res.json({
            ret: 0,
            config: result
        });
    });
})
;

var wxconfig = {
  token: config.get('WEIXIN_TOKEN'),
  appid: config.get('WEIXIN_APP_ID'),
  encodingAESKey: config.get('WEIXIN_ENCODING_AES_KEY')
};
var weixin = wechat(wxconfig).text(function (message, req, res, next) {
  res.reply('hello');
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

router.use('/', weixin);

module.exports = router;
