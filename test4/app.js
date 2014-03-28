'use strict';
var config = require('./config');
var database = require('./services/database');

var express = require('express');
var mongoose = require('mongoose');
var socket = require('socket.io');

var app = express();
module.exports = app;
mongoose.connect('mongodb://'+config.db.server + ':' + config.db.port +'/' + config.db.name);

function main () {
  var http = require('http');

  // //CORS middleware
  // function csrfValue(req) {
  //       return (req.body && req.body._csrf)
  //           || (req.query && req.query._csrf)
  //           || (req.headers['x-csrf-token'])
  //           || (req.headers['x-xsrf-token'])
  //           || (req.cookies['XSRF-TOKEN']);
  // }

  //Configure the application
  app.configure(function() {
    app.use(express.static(__dirname + config.public));
    app.use(express.bodyParser());
    // Session handler
    app.use(express.cookieParser('S3CRE7'));
    app.use(express.session());

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
//    app.use(express.csrf({value: csrfValue}));
//    app.use(express.json());
//    app.use(express.urlencoded());
//    app.use(express.multipart());
  });

  app.configure('production', function() {
    //
  });

  app.configure('development', function() {
    //
  });

  var server = http.createServer(app);

  // Load all routes
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next()
  });

  require('./routes')(app);
  //require('./services/socket')(app);

  // Listen on http port
  server.listen(config.port);
  var io = socket.listen(server);
  app.connections = {};

  io.sockets.on('connection', function (socket) {
    console.log("connect");
    socket.on('username', function(username) {
      app.connections[username] = socket;
      socket.emit('message', { message: 'Welcome ' + username + ' to JARVIS' });
    });
    socket.on('disconnect', function (socket) {
      console.log("disconnect");
    });

    socket.on('message', function (data) {
      console.log("data from client", data);
    });
  });
}

//database.connect(function (err) {
//  if (err) {
//    console.log(err);
//  }
//  main();
//});

main();