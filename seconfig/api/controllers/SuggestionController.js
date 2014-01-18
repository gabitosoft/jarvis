/**
 * SuggestionController
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
      
    var suggestionObj = {
      name: req.param('name'),
      type: req.param('type')
    };
    
    Suggestion.create(suggestionObj, function suggestionCreated(err, suggestion) {
        
      // If there's an error
      if (err) {
          
          console.log(err);
          req.session.flash = {
              err: err
          };

          // If error redirect back to sign-up page
          return res.redirect('/suggestion/new');
      }
      
      Suggestion.save(function(err, suggestion) {
          if (err) return next(err);
          
          res.redirect('/suggestion/show/' + suggestion.id);
      });
    });
  },
  
  show: function (req, res, next) {

    suggestion.findOne(req.param('id'), function foundSuggestion (err, suggestion){
        
        if (err) return next(err);
        if (!suggestion) return next();
        res.view({
            suggestion: suggestion
        });
    });
  },
  
  index: function(req, res, next) {
      
    // Get an array of all suggestions in the Suggestion collection(e.g table)
    Suggestion.find(function foundSuggestion (err, suggestion) {
        if (err) return next(err);
        // pass the array down to the /views/index.ejs page
        res.view({
            suggestions: suggestions
        });
    });
  },
  
  edit: function (req, res, next) {
      
    // Find the suggestion from the id passed in via params
    Suggestion.findOne(req.param('id'), function foundSuggestion (err, suggestion) {
        
        if (err) return next(err);
        if (!suggestion) return next();
        
        res.view({
            suggestion: suggestion
        });
    }); 
  },
  
  // process the infor from edit view
  update: function (req, res, next) {
      
    Suggestion.update(req.param('id'), suggestionObj, function suggestionUpdate(err) {
        if (err) {
          return res.redirect('/suggestion/edit/' + req.param('id'));
        }
        
        res.redirect('/suggestion/show/' + req.param('id'));
    });
  },
  
  destroy: function (req, res, next) {
      
    Suggestion.findOne(req.param('id'), function foundSuggestion(err, suggestion){
        
        if (err) return next(err);
        if (!suggestion) return next('Suggestion doesn\'t exist');
        
        Suggestion.destroy(req.param('id'), function suggestionDestroyed(err){
            if (err) return next(err);
        });
        res.redirect('/suggestion');
    });
  } 
};
