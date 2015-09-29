var express = require('express');
var router = express.Router();
var api = require('../lib/pandocloud-api.js');

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
