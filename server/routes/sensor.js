
var bcrypt = require('bcrypt');

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

// POST create an User and return all of them after creation
//  curl -d '{"name":"Gabriel Delgado", "email":"gabitosoft@gmail.com", "password": "mirmidon"}' -H "Content-Type: application/json" http://localhost:3000/api/user/create

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

  // DELETE an specific User and return all of them after delete it
  app.delete('/api/users/:id', function(req, res){
    User.remove({
      _id: req.params.id
    }, function(err, user){
      if (err) {
        res.send(err);
      }
      user.find(function(err, users){
        if (err) {
          res.send(err);
        }
        res.json(users);
      });
    });
  });
};