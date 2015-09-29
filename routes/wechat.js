var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var jsonfile = require('jsonfile');

var appConfig = jsonfile.readFileSync('./config.json');

// wechat api
var api = new WechatAPI(appConfig.appid, appConfig.appsecret);
api.createMenu({
    "button": [ {
      "name": "添加设备",
      "sub_button": [{
        "type": "view",
        "name": "扫描二维码",
        "url": "http://"+appConfig.hostname+"/common/devices/add"
      }, {
        "type": "view",
        "name": "WiFi配置",
        "url": "http://"+appConfig.hostname+"/common/wifi/config"
      }]
    }, {
      "type": "view",
      "name": "我的设备",
      "url": "http://"+appConfig.hostname+"/common/devices"
    }]
  }, function(err, result) {
  if (err) {
    console.log("create wechat menu failed..." + err);
  } else if (result.errcode !=0 ) {
    console.log(result.errmsg)
  } else {
    console.log("create wechat menu ok");
  }
});

// wechat handler
var config = {
  token: appConfig.token,
  appid: appConfig.appid,
  encodingAESKey: appConfig.aeskey
};

var handler = wechat(config, function (req, res, next) {
  var message = req.weixin;
  console.dir(message);
  var identifier = '';
  switch (message.Event) {
    default:
      console.log('unhandled event: ' + message.Event);
  }

  res.reply('');
});

module.exports = handler;
