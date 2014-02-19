//var express = require("express");
//var app = express();
//var port = 3700;
//
//app.get("/", function(req, res) {
//  res.send("It works!");
//});
//
//var io = require('socket.io').listen(app.listen(port));
//io.sockets.on('connection', function (socket) {
//  socket.emit('message', { message: 'Welcome to JARVIS' });
//  socket.on('send', function(data){
//    io.sockets.emit('message', data);
//  });
//});
//console.log("Listening on port " + port);

var express = require('express');
var app = express.createServer();
var socket = require('socket.io');
app.configure(function(){
  app.use(express.static(__dirname + '/'));
});
var server = app.listen(8081);
var io = socket.listen(server);
io.sockets.on('connection', function (socket) {
  console.log("connnect");
  socket.emit('message', { message: 'Welcome to JARVIS' });
  socket.on('disconnect', function (socket) {
    console.log("disconnect");
  });
});