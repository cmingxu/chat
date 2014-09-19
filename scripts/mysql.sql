CREATE DATABASE chat;

USE chat;

-- users
CREATE TABLE users(
  id int(20),
  name varchar(256),
  email varchar(256),
  encrypted_password varchar(256),
  last_login_at timestamp,
  last_login_ip varchar(255),
  last_sync_at timestamp,
  primary key (id)
);

-- login_log
CREATE TABLE login_log(
  id int(20),
  user_id int(20),
  login_at timestamp,
  ip timestamp,
  primary key(id),
  index index_user_id (user_id)
);

-- friendship
CREATE TABLE friendship(
  id int(20),
  user_id int(20),
  friend_id int(20),
  status char(20),
  request_at timestamp,
  accept_at timestamp
);
