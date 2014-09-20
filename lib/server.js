var net = require('net');
var Message = require('./message').Message;


var Server = function (config) {
  this.config = config;

  this.server = net.createServer(function (c) {
    c.on('data', function (data) {
      c.write(JSON.stringify(new Message("pong", {})));
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
