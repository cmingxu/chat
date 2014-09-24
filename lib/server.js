var net = require('net');
var Message = require('./message').Message;
var config = require("../config");
var Mysql = require('./mysql');
var Session = require('./session');
var Router = require('./router');

Mysql.instance(config);

var Server = Server || {};
Server._instance = null;
Server.instance = function (config) {
  if (Server._instance == null) {

    Server._instance = {};
    Server._instance.config = config;
    Server._instance.sessions = [];
    Server._instance.user_session_map = {};

    Server._instance.server = net.createServer(function (c) {
      console.info("new client connected from  " + c.remoteAddress);
      session = new Session(c, Server._instance);
      Server._instance.sessions.push(session);
    });

    Server._instance.run = function () {
      console.log('server listening on port  ' + Server._instance.config.port);
      Server._instance.server.listen(this.config.port);
    };

    Server._instance.shutdown = function () {
    }

    Server._instance.eachSession = function (callback) {
      Server._instance.sessions.forEach(function (session) {
        callback(session);
      });
    };

    Server._instance.remove_session = function (session) {
      Server._instance.sessions.splice(
        Server._instance.sessions.indexOf(session),
        1
      );

    };

    Router.instance(Server._instance);
  }
  return Server._instance;


  //TODO - close mysql & redis
}
exports = module.exports = Server
