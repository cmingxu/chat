var net = require('net');
var Message = require('./message').Message;
var config = require("../config");
var Mysql = require('./mysql')

Mysql.instance(config);


var Server = function (config) {
  this.config = config;

  this.server = net.createServer(function (c) {
    c.on('data', function (data) {
      c.write(JSON.stringify(new Message("pong", {})));
      Mysql.withConnection(
        function (connection) {
        connection.query("select * from users", function (err, row) {
          console.log('eeeeeeeeee');
          if(err){
            console.log(err);
          }
          else{
            console.log(row);
          }
        })
      }
      );
    });

    c.on('end', function () {
    })

    c.on('error', function () {
    })
  });

}

Server.prototype.run = function () {
  this.server.listen(this.config.port);
  console.log('server listening on port  ' + this.config.port);
}

exports = module.exports = Server
