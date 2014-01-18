/**
 * AreaController
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
      
    var areaObj = {
      name: req.param('name'),
      description: req.param('description'),
    };
    
    Area.create(areaObj, function areaCreated(err, user) {
        
        // If there's an error
        if (err) {
            
            console.log(err);
            req.session.flash = {
                err: err
            };

            // If error redirect back to sign-up page
            return res.redirect('/user/new');
        }
        
        area.save(function(err, user) {
            if (err) return next(err);
            
            // After successfully creating the user
            // redirect to the show action
            res.redirect('/area/show/' + area.name);
        });
    });
  },
  
  // render the area view (e.g. /views/show.ejs)
  show: function (req, res, next) {

    Area.findOne(req.param('name'), function foundArea (err, area){
        
        if (err) return next(err);
        if (!area) return next();
        res.view({
            area: area
        });
    });
  },
  
  index: function(req, res, next) {
      
      // Get an array of all areas in the Area collection(e.g table)
      Area.find(function foundArea (err, areas) {
          if (err) return next(err);
          // pass the array down to the /views/index.ejs page
          res.view({
              areas: areas
          });
      });
  },
  
  edit: function (req, res, next) {
      
      // Find the area from the name passed in via params
      Area.findOne(req.param('name'), function foundArea (err, area) {
          
          if (err) return next(err);
          if (!area) return next();
          
          res.view({
              area: area
          });
      }); 
  },
  
  // process the infor from edit view
  update: function (req, res, next) {
      
      Area.update(req.param('name'), areaObj, function areaUpdate(err) {
          if (err) {
            return res.redirect('/area/edit/' + req.param('name'));
          }
          
          res.redirect('/area/show/' + req.param('name'));
      });
  },
  
  destroy: function (req, res, next) {
      
      Area.findOne(req.param('id'), function foundArea(err, area){
          
          if (err) return next(err);
          if (!area) return next('Area doesn\'t exist');
          
          Area.destroy(req.param('name'), function areaDestroyed(err){
              if (err) return next(err);
          });
          res.redirect('/area');
      });
  }
};
