var events = require('events');
var Message = require("./message").Message;
var MessageBuilder = require("./message").MessageBuilder;


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
  });

  this.eventEmitter.on('login', function (message) {
    self._server_instance.mysql.withConnection(function (connection) {
      connection.query("select * from users where name= '" + message.name +  "' limit 1", function (err, res) {
        if(err){
          self.write('bang');
        }
        else{
          console.log(res);
          if(res.length != 1){
            self.write('no user found');
          }
          else{
            self.user =  res[0];
            self._server_instance.user_session_map[self.user.id] = self;
            self._server_instance.redis.subscribe("u_" + self.user.id);
          }
        }
      });
    });
  });

  this.eventEmitter.on('register', function (message) {
    self._server_instance.mysql.withConnection(function (){
      connection.query("INSERT INTO users(name, password) values ('"+ message.name + "', '" + message.password +"')", function (err, res) {
        if(err){}
        else{
          self.write(MessageBuilder.build("response", {result: true}));
        }
      });
    });
  });

  this.eventEmitter.on('send_message', function (message) {
    self._server_instance.router.send_to_user(message.to, message);
  });

  this.write = function (message) {
    this._socket.write(JSON.stringify(message));
  }
}

Session.prototype.write =
  function(message) {
  return this._socket.write(JSON.stringify(message));
};
Session.prototype.info =
  function() {
  return [this._socket.remoteAddress].join(" , ");
};

Session.prototype.cleanup =
  function() {
};


exports = module.exports = Session;
