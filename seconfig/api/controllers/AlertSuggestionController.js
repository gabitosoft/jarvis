/**
 * AlertSuggestionController
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
    
  'new' : function (req, res) {
    res.view();
  },
  
  create: function (req, res, next) {
      
    var alertSuggestionObj = {
      order: req.param('name'),
      idAlert: req.param('idAlert'),
      idSuggestion: req.param('idSuggestion'),
      action: req.param('action')
    };
    
    AlertSuggestion.create(suggestionObj, function suggestionCreated(err, alertSuggestion) {
        
      // If there's an error
      if (err) {
          
          console.log(err);
          req.session.flash = {
              err: err
          };

          // If error redirect back to sign-up page
          return res.redirect('/alertSuggestion/new');
      }
      
      AlertSuggestion.save(function(err, alertSuggestion) {
          if (err) return next(err);
          
          res.redirect('/alertSuggestion/show/' + alertSuggestion.id);
      });
    });
  },
  
  show: function (req, res, next) {

    alertSuggestion.findOne(req.param('id'), function foundAlertSuggestion (err, alertSuggestion) {
        
        if (err) return next(err);
        if (!alertSuggestion) return next();
        res.view({
            alertSuggestion: alertSuggestion
        });
    });
  },
  
  index: function(req, res, next) {
      
    // Get an array of all alertSuggestion in the AlertSuggestion collection(e.g table)
    AlertSuggestion.find(function foundAlertSuggestion (err, alertSuggestion) {
        if (err) return next(err);
        // pass the array down to the /views/index.ejs page
        res.view({
            alertSuggestions: alertSuggestions
        });
    });
  },
  
  edit: function (req, res, next) {
      
    // Find the alertSuggestion from the id passed in via params
    AlertSuggestion.findOne(req.param('id'), function foundAlertSuggestion (err, alertSuggestion) {
        
        if (err) return next(err);
        if (!alertSuggestion) return next();
        
        res.view({
            alertSuggestion: alertSuggestion
        });
    }); 
  },
  
  // process the infor from edit view
  update: function (req, res, next) {
      
    AlertSuggestion.update(req.param('id'), alertSuggestionObj, function alertSuggestionUpdate(err) {
        if (err) {
          return res.redirect('/alertSuggestion/edit/' + req.param('id'));
        }
        
        res.redirect('/alertSuggestion/show/' + req.param('id'));
    });
  },
  
  destroy: function (req, res, next) {
      
    AlertSuggestion.findOne(req.param('id'), function foundAlertSuggestion(err, alertSuggestion){
        
        if (err) return next(err);
        if (!alertSuggestion) return next('Alert Suggestion doesn\'t exist');
        
        AlertSuggestion.destroy(req.param('id'), function alertSuggestionDestroyed(err){
            if (err) return next(err);
        });
        res.redirect('/alertSuggestion');
    });
  }  
};
