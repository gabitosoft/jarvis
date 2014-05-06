
var bcrypt = require('bcrypt');

// Paths to API
module.exports = function (app) {

  var User = require('../models/User');

  // GET Users
  app.get('/api/user', function(req, res) {
    User.find(function(err, users){
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });


  //POST create
  app.post('/api/user/create', function(req, res) {
    if (!req.body.password || req.body.password !== req.body.confirmation) {
      res.send(500, 'Password is not matching');
    }

    var userToken = 'default';
    try {
      token = crypto.randomBytes(256);
      console.log('Have %d bytes of random data: %s', token.length, token);
    } catch (ex) {
      res.send(500, ex);
    }

    bcrypt.hash(req.body.password, 10, function passwordEncrypted(err, encryptedPwd) {
      if (err) return res.send(500, err);
      User.create({
        name: req.body.name,
        email: req.body.email,
        admin: false,
        online: false,
        encryptedPassword: encryptedPwd,
        token: userToken
      }, function(err) {
        if (err) {
          res.send(err);
        }
      });
    });

    res.send(200);
  });


  // POST login
  app.post('/api/user/login', function(req, res) {

    if (!req.param('username') || !req.param('password')) {
      res.send(500, 'Invalid parameters');
      return;
    }

    User.findOne({ email: req.param('username') }, function(err, user) {

      if (err) {
          res.send(500, 'User not found');
          return ;
      }

      // Compare password from the form params to the encrypted password of the user found.
      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) {
          res.send(500, 'encryptedPassword failed');
          return ;
        }

        // If the password from the form doesn't match the password from the database....
        if (!valid) {
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination.'}];

          res.send(500, usernamePasswordMismatchError);
          return;
        }

        req.session.regenerate(function (err) {
          if (err) {
            res.send(500, err);
            return;
          }
        });
        
        // Log user in
        req.session.authenticated = true;
        req.session.User = user;

        // Change status to online
        User.update({ email: user.email }, { online : true }, function(err) {
          if (err) {

            res.send(500, 'login: fail on update');
          }

          // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
          for (var username in app.connections) {
            app.connections[username].emit('connected', user.email);
            app.connections[username].emit('alert', 'User: ' + user.email + 'now is connected');
          }

          res.send(200,  {'message': 'Access granted'});
        });
      });
    });
  });

  // POST logout
  app.post('/api/user/logout', function(req, res) {

    if (req.session.User) {

      User.findOne({ email : req.session.User.email}, function foundUser(err, user) {

          if (err) {
            res.send(500, err);
          }
          // The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
          User.update({ email: user.email }, { online: false }, function(err) {
            if (err) {
              res.send(500, 'logout: fail on update');
              return;
            }

            // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged out
            for (var username in app.connections) {
              app.connections[username].emit('disconnected', user.id);
            }

            // Wipe out the session (log out)
            req.session.destroy();

            // Redirect the browser to the sign-in screen
            res.send(200, {'message': 'session closed'});
            return;
          });
      });
    } else {
      res.send(500, 'Session Expired');
    }
  });

  //DELETE 
  app.delete('/api/user/:id', function(req, res){
    User.remove({
      _id: req.params.id
    }, function(err, user){
      if (err) {
        res.send(err);
      }
      User.find(function(err, users){
        if (err) {
          res.send(err);
        }
        res.json(users);
      });
    });
  });
};