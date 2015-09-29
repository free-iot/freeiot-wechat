var https = require('https');

var API_HOST = "api.pandocloud.com";
var API_PORT = 443;
var APP_KEY = "0f576cb2b626dc5c9d4de711d6fb8178187b74f114ae388aa3b36ec7b8cf6ea8";

function sendRequest(method, path, data, callback){
  var opt = {
    host: API_HOST,
    port: API_PORT,
    method: method,
    path: path,
    headers:{
      "App-Key": APP_KEY
    },
    rejectUnauthorized: false
  };

  console.log("pandocloud api request:");
  console.dir(opt);

  var body = "";
  var req = https.request(opt, function(res) {
    console.log("HTTP request got response: " + res.statusCode);
    res.on('data',function(d){
      body += d;
    }).on('end', function(){
      console.log(res.headers)
      console.log(body)
      result = JSON.parse(body)
      if (result["code"]){
        console.log("result code not 0: " + result["message"]);
        return callback(result["message"], null)
      }
      return callback(null, result["data"])
    });
  }).on('error', function(e) {
    console.log("HTTP request got error: " + e.message);
    return callback(e.message, null)
  });
  if (data){
    req.write(JSON.stringify(data));
  }
  req.end();
}


exports.getDeviceInfo = function(key, callback) {
  sendRequest('GET', '/v1/application/device/info?device_key=' + key, null, function(err, data){
    return callback(err, data);
  });
}

exports.getDeviceInfoByIdentifier = function(identifier, callback) {
  sendRequest('GET', '/v1/application/device/' + identifier + '/info', null, function(err, data){
    return callback(err, data);
  });
}

exports.sendCommandToDevice = function(identifier, command, callback) {
  sendRequest('POST', '/v1/application/device/' + identifier + '/command', command, function(err, data){
    return callback(err, data);
  });
}


exports.getDeviceCurrentStatus = function(identifier, callback) {
  sendRequest('GET', '/v1/application/device/' + identifier + '/status/current', null, function(err, data){
    return callback(err, data);
  });
}

exports.setDeviceCurrentStatus = function(identifier, status, callback) {

}
