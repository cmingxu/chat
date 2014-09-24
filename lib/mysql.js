var mysql = require('mysql');

var Mysql = {};

Mysql._instance = null;
Mysql.instance = function (config) {
  if(Mysql._instance == null){
    Mysql._instance  = mysql.createPool({
      connectionLimit : 10,
      host            : config.mysql_url.split(":")[0],
      user            : config.mysql_user,
      password        : config.mysql_pass,
      database        : config.database
    });


    Mysql._instance.withConnection = function (callback) {
      Mysql._instance.getConnection(function (err, connection) {
        console.log('wwwwwwww');
        if(err){
          throw err;
        }else{
          callback(connection);
          connection.release();
        }
      });
    }
  }

  return Mysql._instance;
};



exports = module.exports = Mysql;
