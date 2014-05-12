// Paths to API
module.exports = function (app) {
  var async = require('async');
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
    var asyncTask = [];

    Sensor.find(function (err, sensors) {
      sensors.forEach(function (item, index) {
        asyncTask.push(function (callback){
            Alert.find({ source: item.address }, function(err, alerts) {
              if (err) {
                res.send(err);
              }
              var unknow = 0;
              var information = 0;
              var warning = 0;
              var danger = 0;

              alerts.forEach(function(alert){
                if (alert.type == 'info') information++;
                else 
                  if (alert.type == 'warning') warning++; 
                  else
                    if (alert.type == 'danger') danger++;
                  else
                    unknow++;
              });

              data.push({ 
                name: item.name, 
                address: item.address,
                data:[unknow, information, warning, danger]
              });

              callback();
            });
          });
      });

      async.parallel(asyncTask, function (err, result){
        if (err) {return;}
        console.log('data', data);
        res.json(data);
      });
    });
  });

  // POST alert
  app.post('/api/alert', function(req, res) {
    
    // User.findOne({ email: req.body.email }, function(error, user) {
    //   if (user.token != req.body.token) {
    //     console.log('Invalid Token');
    //     res.send(500, 'Invalid Token');
    //     return;
    //   }
    // });

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