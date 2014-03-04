
var bcrypt = require('bcrypt');

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
  app.post('/api/user/create', function(req, res) {
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

  // POST login user
  app.post('/api/user/login', function(req, res) {

    if (!req.param('email') || !req.param('password')) {
      res.send(200, 'Invalid parameters');
      return;
    }

    User.findOne({ email: req.param('email') }, function(err, user) {

      // Compare password from the form params to the encrypted password of the user found.
      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) {
          res.send(500, err);
          return ;
        }

        // If the password from the form doesn't match the password from the database....
        if (!valid) {
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination.'}];

          res.send(500, usernamePasswordMismatchError);
          return;
        }

        // Log user in
        req.session.authenticated = true;
        req.session.User = user;

        // Change status to online
        user.update(user.id, { online : true }, function(err) {
          if (err) return;

          // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
          app.connections.forEach(function (socket) {
            socket.emit('connected', user.id);
          });

          // Redirect to their profile page (e.g. /views/user/show.ejs)
          res.send(200);
        });
      });
    });
  });

  // POST logout user
  app.post('/api/user/logout', function(req, res) {
    //var query = { userId: req.session.User.id };
    User.findOne(req.session.User.id, function foundUser(err, user){

      var userId = req.session.User.id;

      if (user) {
        // The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
        User.update(userId, {
          online: false
        }, function(err) {
          if (err) return res.send(500, err);

          app.connections.forEach(function (socket) {
            socket.emit('disconnected', user.id);
          });

          // Wipe out the session (log out)
          req.session.destroy();

          // Redirect the browser to the sign-in screen
          res.send(200);
        });
      } else {
        // Wipe out the session (log out)
        req.session.destroy();

        res.send(500, 'User not found');
      }
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