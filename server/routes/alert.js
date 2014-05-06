// Paths to API
module.exports = function (app) {
  var Alert = require('../models/Alert');
  var User = require('../models/User');
  var Sensor = require('../models/Sensor');

  // GET alerts
  app.get('/api/alert', function(req, res) {
    Alert.find(function(err, alerts) {
      if (err) {
        res.send(err);
      }
      res.json(alerts);
    });
  });

  // GET alerts no read
  app.get('/api/alert/noread', function(req, res) {
    Alert.find({ read: false }, function(err, alerts) {
      if (err) {
        res.send(err);
      }
      res.json(alerts);
    });
  });

  // GET alerts by sensor
  app.get('/api/alert/querysensor', function(req, res) {
    var data = [];
    Sensor.find(function (err, sensors) {
      sensors.forEach(function (item, index){
        Alert.find({ source: item.address }, function(err, alerts) {
          if (err) {
            res.send(err);
          }

          data.push({ alerts: alerts, source: item.address });
        });
      });

      res.json(data);
    });
  });

  // POST alert
  app.post('/api/alert', function(req, res) {
    
    User.findOne({ email: req.body.email }, function(error, user) {
      if (user.token != req.body.token) {
        console.log('Invalid Token');
        res.send(500, 'Fail');
        return;
      }
    });

    // POST create
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

  //DELETE 
  app.delete('/api/alert/:id', function(req, res) {
    Alert.remove({
      _id: req.params.id
    }, function(err, alert){
      if (err) {
        res.send(err);
      }
      Alert.find(function(err, alerts){
        if (err) {
          res.send(err);
        }
        res.json(alerts);
      });
    });
  });
};