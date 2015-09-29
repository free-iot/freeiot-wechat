var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var jsonfile = require('jsonfile');
var wechatAuth = require('../middlewares/wechat-auth')

var appConfig = jsonfile.readFileSync('./config.json');

var api = new WechatAPI(appConfig.appid, appConfig.appsecret);

var userDevice = {};

router.use(wechatAuth);

router.get('/add', function(req, res, next) {
  console.log(req.wxopenid);
  var identifier = req.query.identifier;
  console.log(identifier);
  if ( !identifier ) {
    api.getJsConfig({
      debug: true,
      jsApiList: ['configWXDeviceWiFi', 'scanQRCode'],
      url: 'http://' + req.hostname + req.originalUrl 
    }, function(err, result){
      res.render('devices-add', {config: result})
    });
  } else {
    userDevice[req.wxopenid] = identifier;
    res.send("ok");
  }
});

router.get('/', function(req, res, next) {
  console.log(req.wxopenid);
  var identifier = userDevice[req.wxopenid];
  if (identifier) {
    res.redirect('/switch/index.html?identifier=' + identifier);
  } else {
    res.send('请先添加设备！');
  }
});

module.exports = router;
