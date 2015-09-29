var express = require('express');
var router = express.Router();
var api = require('../lib/pandocloud-api.js');

// add cors suport
router.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

/* GET device status. */
router.get('/device/status/current', function(req, res, next) {
  var identifier = req.query.identifier;
  api.getDeviceCurrentStatus(identifier, function(err, data){
    if(err){
      return res.send({'code': 1, 'msg': err});
    }
    return res.send({'code':0, 'msg': "", 'data': data});
  });
});

/* SET device status. */
router.post('/device/status/current', function(req, res, next) {
  var identifier = req.query.identifier;
  console.log(JSON.stringify(req.body));
  var data = req.body;
  api.setDeviceCurrentStatus(identifier, data, function(err, data){
    if(err){
      return res.send({'code': 1, 'msg': err});
    }
    return res.send({'code':0, 'msg': ""});
  });
});

/* SEND command to device. */
router.post('/device/command', function(req, res, next) {
  var identifier = req.query.identifier;
  console.log(JSON.stringify(req.body));
  var command = req.body;
  api.sendCommandToDevice(identifier, command, function(err, data){
    if(err){
      return res.send({'code': 1, 'msg': err});
    }
    return res.send({'code':0, 'msg': ""});
  });
});

module.exports = router;
