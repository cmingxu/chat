INSERT INTO users(name, email) values ('zmm', 'zmm@gmail.com');
INSERT INTO users(name, email) values ('xcm', 'xcm@gmail.com');

INSERT INTO friendship(user_id, friend_id, status) values (1, 1, 'accepted');

INSERT INTO groups(user_id, name) values (1, 'group_name');
INSERT INTO users_groups(user_id, group_id) values (1, 1);
INSERT INTO users_groups(user_id, group_id) values (1, 2);

