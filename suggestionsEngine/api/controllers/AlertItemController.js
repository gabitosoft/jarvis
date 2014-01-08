/**
 * AlertItemController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  'new': function(req, res) {
      //res.view('alertitem/new');
  },

  // TODO need improve this action
  create: function(req, res, next) {
      
      // Try to find the user by there email address.
      Alert.findOne(req.param('id'), function foundAlert(err, alert) {
          if (err) return next(err);
          
          // If no alert is found
          if (!alert) {
              var noAlertError = [{name: 'noAlert', message: 'The alert' + req.param('id') + ' not found.'}];
              req.session.flash = {
                  err: noAccountError
              };
              //res.redirect('/alert/new');
              return;
          }
          
          alert.save(function(err, user) {
              if (err) return next(err);

              // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
              Alert.publishUpdate(alert.id, {
                  loggedIn: true,
                  id: user.id
              });

              // If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
              // This is used in conjunction with config/policies.js file
              if (req.session.User.admin) {
                  res.redirect('/user');
                  return;
              }

              // Redirect to their profile page (e.g. /views/user/show.ejs)
              res.redirect('/user/show/' + user.id);
          });
      });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AlertItemController)
   */
  _config: {}

  
};
