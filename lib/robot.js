#!/usr/bin/env node

var net = require('net');
var Message = require("./message").Message;
var MessageBuilder = require("./message").MessageBuilder;

client = net.connect({'port': 8000});

client.on('data', function(data){ 
  console.log(MessageBuilder.from(data));
})
//client.write(JSON.stringify(MessageBuilder.build("ping", {})));

m  = new Message("ping", {"name": "PingName"});

client.write(JSON.stringify(m));

