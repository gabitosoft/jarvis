// Paths to API
module.exports = function (app) {
  var Alert = require('../models/Alert');
  app.post('/api/alert', function(req, res) {
    //curl -d '{"user":"Gabriel", "key":"This is an alert test"}' -H "Content-Type: application/json" http://localhost:8081/api/alert
//    console.log(req.body);
//    console.log('request =' + JSON.stringify(req.body));
//    var socket = app.connections[req.body.user];
//    if (socket !== undefined) {
//      socket.emit('message', { message: req.body.key });
//    } else {
//      res.send(500, 'Socket not found');
//    }
    // Create an Alert
    Alert.create({
      server: req.body.server,
      date: req.body.date,
      message: req.body.message,
      read: false
    }, function(err, alert) {
      if (err) {
        console.log(err);
        res.send(500, err);
      }

      //curl -d '{"server":"127.0.0.1", "date":"04-03-2014", "message": "Alert from console", "read": false}' -H "Content-Type: application/json" http://localhost:3000/api/alert
      // Send the alert to the client
      for (var username in app.connections) {
        app.connections[username].emit('alert', alert);
      }
    });

    res.send(200);
  });
};