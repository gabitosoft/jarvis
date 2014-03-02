// Paths to API
module.exports = function (app){

  var User = require('../models/User');
  // Paths to API
  // GET for Users
  app.get('/api/user', function(req, res) {
    User.find(function(err, users){
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
    res.send(200);
  });

// POST create an User and return all of them after creation
  app.post('/api/user', function(req, res) {
    var encryptedPwd = req.body.password;
    User.create({
      name: req.body.name,
      email: req.body.email,
      admin: false,
      online: false,
      encryptedPassword: encryptedPwd
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      user.find(function(err, users) {
        if (err) {
          res.send(err);
        }
        res.json(users);
      });
    });
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