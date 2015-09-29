var OAuth = require('wechat-oauth');
var jsonfile = require('jsonfile');

var appConfig = jsonfile.readFileSync('./config.json');

var client = new OAuth(appConfig.appid, appConfig.appsecret);

var wechatAuth = function(req, res, next) {
  var openid = req.cookies.wxopenid;
  console.log('wechatauth:openid:' + openid)
  if ( !openid ) {
    var code = req.query.code;
    if ( code ) {
      client.getAccessToken(code, function(err, result) {
        console.log(JSON.stringify(result));
        var accessToken = result.data.access_token;
        openid = result.data.openid;
        res.cookie('wxopenid', openid, {maxAge: 90000000});
        req.wxopenid = openid;
        next();
      });
    } else {
      var url = client.getAuthorizeURL('http://' + appConfig.hostname + req.originalUrl, 'state', 'snsapi_base');
      console.log('redirect to wechat auth url: ' + url);
      res.redirect(url);
    }
  } else {
    req.wxopenid = openid;
    next();
  }
}

module.exports = wechatAuth;
