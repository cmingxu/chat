var mysql = require('mysql');



var Mysql = function (config) {
  this.pool  = mysql.createPool({
    connectionLimit : 10,
    host            : config.mysql_url,
    user            : config.mysql_user,
    password        : config.mysql_pass
  });
};

Mysql.prototype.withConnection = function (callback) {
}



pool.getConnection(function (err, connection) {
  if(err){}
  else{
    connection.query("desc users", function (err, row) {
      if(err){}
      else{
        console.log(row);
        connection.release();
      }
    })
  }
});
