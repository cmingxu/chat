var redis = require('redis');

var Redis = {};

Redis._instance = null;
Redis.instance = function (config) {
  if(Redis._instance == null){
    Redis._instance =  redis.createClient(); 
  }

  return Redis._instance;
}

exports = module.exports = Redis;
