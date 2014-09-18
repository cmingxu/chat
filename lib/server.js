var net = require('net');


var Server = function (config) {
  this.config = config;

  this.server = net.createServer(function (c) {
    c.on('data', function (data) {
      c.write(data);
    });

    c.on('end', function () {
    })

    c.on('error', function () {
    })
  });

}

Server.prototype.run = function () {
  this.server.listen(this.config.port);
  console.log('server listening on port' + this.config.port);
}

exports = module.exports = Server
