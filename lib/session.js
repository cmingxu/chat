
var Session = function (socket, server_instance) {
  self = this;
  this._user = null;
  this._server_instance = server_instance;
  this._socket = socket;
  this._socket.on('data', function (data) {
  });

  this._socket.on('end', function () {
    self.cleanup();
    self._server_instance.remove_session(self);
  });

  this._socket.on('error', function () {
  });

  this._login_info = null;

  this.kick = function () {
  }

  this.login = function () {
  }

  this.message_to = function(user_or_group, message) {
  }

  this.write = function (message) {
    this._socket.write(JSON.stringify(message));
  }
}

Session.prototype.info =
function() {
  return [this._socket.remoteAddress].join(" , ");
};

Session.prototype.cleanup =
function() {
  //console.info(this._socket.remoteAddress + " end");
  //this._socket.end();
};
exports = module.exports = Session;
