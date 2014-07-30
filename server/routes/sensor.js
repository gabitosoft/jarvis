
// Paths to API
module.exports = function (app) {

  var Sensor = require('../models/Sensor');
  // Paths to API
  // GET for Users
  app.get('/api/sensor', function(req, res) {
    Sensor.find(function(err, sensors){
      if (err) {
        res.send(err);
      }
      res.json(sensors);
    });
  });

// POST create an Sensor

  app.post('/api/sensor/create', function(req, res) {

    Sensor.create({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description
    }, function(err) {
      if (err) {
        res.send(err);
      }
    });

    res.send(200);
  });

  // DELETE a Sensor
  app.delete('/api/sensor/:id', function(req, res) {
    Sensor.remove({
      _id: req.params.id
    }, function(err, sensor){
      if (err){ 
        res.send(500, 'error-delete-sensor' + err);
      }
      res.send(200, 'sensor-deleted');
    });
  });
};