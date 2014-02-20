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
  app.use(express.bodyParser());
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

// POST
app.post('/api/alert', function(req, res) {

//curl -X POST "http://localhost:8081/api/alert?name=gabriel&lastname=delgado"
//  console.log('name', req.param('name'));
//  console.log('lastname', req.param('lastname'));

    //curl -d '{"MyKey":"My Value"}' -H "Content-Type: application/json" http://localhost:8081/api/alert
    console.log(req.body);
    console.log('request =' + JSON.stringify(req.body));

    io.sockets.emit('message', { message: req.body });
    res.send(200);
});