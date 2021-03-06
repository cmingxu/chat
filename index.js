#!/usr/bin/env node


var program = require('commander');
var fs      = require('fs');
var os      = require('os');
var config  = require('./config');
var Server  = require('./lib/server');
package = require("./package");

//program
//.version('0.0.1')
//.option('-p, --peppers', 'Add peppers')
//.option('-P, --pineapple', 'Add pineapple')
//.option('-b, --bbq', 'Add bbq sauce')
//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//.parse(process.argv);

//console.log('you ordered a pizza with:');
//if (program.peppers) console.log('  - peppers');
//if (program.pineapple) console.log('  - pineapple');
//if (program.bbq) console.log('  - bbq');
//console.log('  - %s cheese', program.cheese);



Server.instance(config).run()

process.on('SIGINT', function () {
  server.shutdown();
  process.exit(0);
});

process.on('USR1', function () {
  Server.instance().eachSession(function (s) {
    console.log(s.info());
  });
});
