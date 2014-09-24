var Mysql = require('./Mysql');
var Redis = require('./Redis');
var events = require('events');
var Message = require("./message").Message;


var Session = function (socket, server_instance) {
  self = this;
  this.eventEmitter = new events.EventEmitter();
  this._user = null;
  this._server_instance = server_instance;
  this._socket = socket;
  this._socket.on('data', function (data) {
    message = JSON.parse(data);
    self.eventEmitter.emit(message.type, message);
  });

  this._socket.on('end', function () {
    self.cleanup();
    self._server_instance.remove_session(self);
  });

  this._socket.on('error', function () {
  });

  this.kick = function () {
  }

  this.message_to = function(user_or_group, message) {
  }

  this.eventEmitter.on('ping', function (message) {
    m = new Message("pong", {});
    self.write(m)
  })
  this.write = function (message) {
    this._socket.write(JSON.stringify(message));
  }

}

Session.prototype.ping = function() {
  m = new Message("pong", {});
  this.write(m)
};
Session.prototype.info =
  function() {
  return [this._socket.remoteAddress].join(" , ");
};

Session.prototype.cleanup =
  function() {
  //console.info(this._socket.remoteAddress + " end");
  //this._socket.end();
};

Session.prototype.login =
  function(message) {
  self = this;
  Mysql.withConnection(function (connection) {
    user = connection.query("select * from users where name= '" + message.name +  "' limit 1", function (err, res) {
      if(err){
        self.write('bang');
      }
      else{
        if(res.length != 1){}
        else{
          self.user =  res[0];
          self._server_instance.user_session_map[self.user.id] = self;
          Redis.instance().subscribe("u_" + self.user.id);
        }
      }
    });
  });
};

exports = module.exports = Session;
