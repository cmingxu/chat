var Session = function (socket) {
  this._user = null;
  this._socket = socket;
  this._socket.on('data', function (data) {
  });

  this._socket.on('end', function () {
    this.cleanup();
    Server.instance().remove_session(this);
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

  this.cleanup = function () {
  }

  this.write = function (message) {
    this._socket.write(JSON.stringify(message));
  }
}


exports = module.exports = Session;
