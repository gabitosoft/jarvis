/**
 * ActionSuggestionController
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

  create: function (req, res, next) {

    var alertSuggObj = {
      name: req.param('name'),
      rules: req.param('rules'),
      type: req.param('area'),
      priority: req.param('priority')
    };

    AlertSuggestion.create(alertSuggObj, function alertSuggCreated(err, alertSuggestion) {

      // If there's an error
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };

        // If error redirect back to sign-up page
        return res.redirect('/alert/new');
      }

      alertSuggestion.save(function(err, alertSugg) {
        if (err) return next(err);

        //res.redirect('/alert/index');
      });
    });
  }

};
