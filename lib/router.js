var Router = {};

Router._instance = null;
Router.instance = function (server) {
  if(Router._instance == null){
    Router._instance = {};
    Router._instance._server = server;

    Router._instance.group_users_map = {};

    Router._instance.send_to_user = function (user_id, message) {
    }

    Router._instance.send_to_group = function (group_id, message) {
    }
  }

  return Router._instance;
}

exports = module.exports = Router;
