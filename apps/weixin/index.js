var express = require('express');
var controller = require('./weixin.controller');

var router = express.Router();

router.get('/sign', controller.sign);
router.get('/getopenid', controller.getopenid);
router.get('/validate', controller.validate);
router.use('/', controller.chat);


module.exports = router;
