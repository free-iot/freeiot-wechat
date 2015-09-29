var mysql = require('mysql');
var jsonfile = require('jsonfile');

var appConfig = jsonfile.readFileSync('./config.json');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : appConfig.mysql.host,
  user            : appConfig.mysql.user,
  password        : appConfig.mysql.password
});

module.exports = pool;