var Router = {};

Router._instance = null;
Router.instance = function (server) {
  if(Router._instance == null){

    Router._instance = {};
    Router._instance._server = server;

    server.redis.on('message', function (channel, message) {
      user_id = parseInt(channel.split("_")[1]);
      Router._instance._server.user_session_map[user_id].write(message);
    });

    Router._instance.group_users_map = {};

    Router._instance.send_to_user = function (user_id, message) {
      server.redis.publish("u_" + user_id, message)
    }

    Router._instance.send_to_group = function (group_id, message) {
      server.redis.instance().publish("g_" + group_id, message)
    }
  }

  return Router._instance;
}

exports = module.exports = Router;
