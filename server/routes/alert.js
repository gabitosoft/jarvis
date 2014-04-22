// Paths to API
module.exports = function (app) {
  var Alert = require('../models/Alert');
  var User = require('../models/User');

  // POST
  app.post('/api/alert', function(req, res) {
    
    User.findOne({ email: req.body.email }, function(error, user) {
      if (user.token != req.body.token) {
        console.log('Invalid Token');
        res.send(500, 'Fail');
        return;
      }
    });

    // Create an Alert
    Alert.create({
      source: req.body.source,
      date: req.body.date,
      type: req.body.type,
      title: req.body.title,
      description: req.body.description,
      read: false
    }, function(err, alert) {
      if (err) {
        console.log(err);
        res.send(500, err);
      }

      // Send the alert to the client
      for (var username in app.connections) {
        app.connections[username].emit('alert', alert);
      }
    });

    res.send(200);
  });
};