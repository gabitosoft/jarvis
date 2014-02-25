'use strict';
require('./config');

//var database = require('./services/database');
//var socket = require('./services/socket');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
module.exports = app;

function main () {
  var http = require('http');

  //Configure the application
  app.configure(function(){
    //
  });

  app.configure('production', function(){
    //
  });

  app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
//    app.use(express.json());
//    app.use(express.urlencoded());
//    app.use(express.multipart());
  });

  var server = http.createServer(app);
  var socket = require('socket.io');

  // Load all routes
  require('./routes')(app);

  // Listen on http port
  server.listen(3000);
  var io = socket.listen(server);

  io.sockets.on('connection', function (socket) {
    console.log("connnect");
    socket.emit('message', { message: 'Welcome to JARVIS' });
    socket.on('disconnect', function (socket) {
      console.log("disconnect");
    });
  });
}

database.connect(function (err) {
  if (err) {
    //
  }
  main();
});