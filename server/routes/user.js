
var bcrypt = require('bcrypt');
var crypto = require('crypto');

// Paths to API
module.exports = function (app) {

  var User = require('../models/User');
  var Session = require('../models/Session');

  // GET Users
  app.get('/api/user', function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(500, err);
      }
      res.json(users);
    });
  });


  //POST create
  app.post('/api/user/create', function(req, res) {
    if (!req.body.password || req.body.password !== req.body.confirmation) {
      res.send(500, 'password-not-match');
      return;
    }

    var userToken = 'default';
    try {
      token = crypto.randomBytes(16);
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
        token: userToken,
        settings: {
          allAlerts: true,
          unknowAlerts: true,
          informationAlerts: true,
          warningAlerts: true,
          dangerAlerts: true,
          chartSensor: true,
          chartType: true,
          language: 'English',
          numAlerts: 30,
          numSensors: 30,
          numUsers: 30
        }
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
      res.send(500, 'invalid-parameters');
      return;
    }

    User.findOne({ email: req.param('username') }, function(err, user) {

      if (err) {
          res.send(500, 'problems-findOne');
          return ;
      }

      if (!user) {
        res.send(500, 'user-not-found');
        return ;
      }

      // Compare password from the form params to the encrypted password of the user found.
      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) {
          res.send(500, 'encryptedPassword-failed');
          return ;
        }

        // If the password from the form doesn't match the password from the database....
        if (!valid) {
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination.'}];

          res.send(500, 'username-password-mismatch');
          return;
        }

        // Change status to online
        var token = req.session.id;
        User.update({ email: user.email }, { online : true, token: token }, function(err) {
          if (err) {
            res.send(500, 'login-fail-update');
          }

          // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
          for (var username in app.connections) {
            app.connections[username].emit('connected', user.email);
            app.connections[username].emit('alert', 'User: ' + user.email + 'now is connected');
          }

          // Log user in
          Session.create({
              id: token,
              username: req.param('username')
            }, function(err) {
              if (err) {
                res.send(err);
              }
          });

          res.send(200, { message: 'access-granted', token: user.token });
        });
      });
    });
  });

  // POST logout
  app.post('/api/user/logout', function(req, res) {

    console.log('id', req.body.token);
    console.log('username', req.body.username);
    Session.findOne({ id: req.body.token, username: req.body.username }, function(err, session) {

      if (!session) {
        res.send(500, 'session-expired');
        return;
      }

      User.findOne({ email : req.body.username }, function foundUser(err, user) {

          if (err) {
            res.send(500, 'logout-error-findOne');
            return;
          }

          if (!user) {
            res.send(500, 'logout-fail-usernotfound');
            return;
          }

          var token = user.token;
          // The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
          User.update({ email: user.email }, { online: false, token: null }, function(err) {
            if (err) {
              res.send(500, 'logout-fail-update');
              return;
            }

            // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged out
            for (var username in app.connections) {
              app.connections[username].emit('disconnected', user.id);
            }

            // Wipe out the session (log out)
            Session.remove({
              id: token
            }, function (err, session){
              if (err) {
                res.send(500, 'session-fail-delete');
              }
              res.send(200, 'session-deleted');
            });
          });
      });
    });
  });
    
  // POST Token
  app.post('/api/user/token', function (req, res) {        
    
    User.findOne({ email: req.body.username }, function(err, user) {
      if (err) {

        res.status(500).end( ' error-token-user ' + err);
      }

      crypto.randomBytes(16, function(ex, buf) {
        var token = buf.toString('hex');
        
        User.update({ email: req.body.username }, { token: token }, function(err) {
          if (err) {
            res.json({'result': 500 + ' error-token-user ' + err});
          }

          res.status(200).end(token);
        });
      });
    });
  });


  // GET User
  app.get('/api/user/:id', function(req, res) {
    User.findOne({ email: req.params.id }, function(err, user) {
      if (err) {
        res.send(500, 'error-get-user' + err);
      }
      res.json(user);
    });
  });

  // POST User settings
  app.post('/api/user/settings', function(req, res) {

      var data = req.body;
      var email = req.body.email;
    
      if (!data && !email) {
        res.send(500, 'user-settings-failed');
      }

      User.update({ email: email }, 
        { 
          settings: {
            allAlerts: data.allAlerts,
            unknowAlerts: data.unknowAlerts,
            informationAlerts: data.informationAlerts,
            warningAlerts: data.warningAlerts,
            dangerAlerts: data.dangerAlerts,
            chartSensor: data.chartSensor,
            chartType: data.chartType,
            language: data.language
          }
        }, 
        function(err) {
          if (err) {
            res.send(500, 'user-settings-failed');
          }
          res.send(200, {message: 'settings-updated'});
        }
      );
  });

  //DELETE User
  app.delete('/api/user/:id', function(req, res){
    User.remove({
      id: req.params.id
    }, function(err, user){
      if (err) {
        res.send(500, 'user-error-delete' + err);
      }
      res.send(200, 'user-deleted');
    });
  });

  //DELETE Session
  app.delete('/api/session/:id', function(req, res) {
    Session.remove({
      id: req.params.id
    }, function (err, session){
      if (err) {
        res.send(500, 'session-fail-delete');
      }
      res.send(200, 'session-deleted');
    });
  });
};
