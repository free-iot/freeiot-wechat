var express = require('express');
var WechatAPI = require('wechat-api');
var jsonfile = require('jsonfile');
var wechatAuth = require('../middlewares/wechat-auth');
var pandoAPI = require('../lib/pandocloud-api');
var userDevice = require('../models/user_device');

var router = express.Router();

var appConfig = jsonfile.readFileSync('./config.json');

var api = new WechatAPI(appConfig.appid, appConfig.appsecret);

router.get('/wifi/config', function(req, res, next) {
  api.getJsConfig({
    url: 'http://' + appConfig.hostname + req.originalUrl 
  }, function(err, result){
    if(err){
      return console.log(err);
    }
    res.render('wifi-config', {
      "title": "WiFi配置",
      "javascripts": ["/common/js/wifi-config.js"],
      "stylesheets": ["/common/css/wifi-config.css"],
      "config": result
    });
  });
  
});


router.use('/devices/add', wechatAuth);
router.get('/devices/add', function(req, res, next) {
  api.getJsConfig({
    url: 'http://' + appConfig.hostname + req.originalUrl 
  }, function(err, result){
    res.render('devices-add', {
      "title": "扫描设备",
      "javascripts": [],
      "stylesheets": [],
      "config": result
    });
  });
  
});

router.post('/devices/add', function(req, res, next) {
  var identifier = req.query.identifier;
  // request for device default name
  pandoAPI.getDeviceInfoByIdentifier(identifier, function(err, data){
    if(err) {
      console.log("error get device info, identifier: " + identifier + ":" + err);
      return res.send(err);
    }
    userDevice.add({
        user_openid: req.wxopenid, 
        device_identifier: identifier,
        device_alias: data.name
      }, function(err, result) {
        if(err && err.code != 'ER_DUP_ENTRY') {
          console.log(err);
          return res.send(err);
        } 
        return res.send('ok');
    }); 
  });   
});

router.get('/device/info', function(req, res, next) {
  var identifier = req.query.identifier;
  pandoAPI.getDeviceInfoByIdentifier(identifier, function(err, data){
    if(err) {
      console.log("error get device info, identifier: " + identifier + ":" + err);
      return res.send(err);
    }
    return res.send(data);
  });
});

router.use('/devices', wechatAuth);
router.get('/devices', function(req, res, next) {
  userDevice.getUserDevices(req.wxopenid, function(err, result){
      console.dir(result); 
      res.render('devices', {
        "title": "我的设备",
        "javascripts": ["/common/js/devices.js"],
        "stylesheets": ["/common/css/devices.css"],
        "devices": result
      });
    }); 
});

module.exports = router;

