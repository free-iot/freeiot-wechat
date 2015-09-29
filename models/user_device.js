var pool = require('./pool');

exports.add = function(one, cb) {
  pool.query('INSERT INTO wechat.user_device SET ?', one, function(err, result) {
    return cb(err, result);
  }); 
}

exports.getUserDevices = function(openid, cb) {
  pool.query('SELECT * FROM wechat.user_device WHERE user_openid = ?',
    [openid], function(err, result){
      return cb(err, result);
  }); 
}

exports.getDeviceByUser = function(openid, identifier, cb) {
  pool.query('SELECT * FROM wechat.user_device WHERE user_openid = ? and device_identifier = ?', [openid, identifier], function(err, result){
    return cb(err, result);
  })
}
