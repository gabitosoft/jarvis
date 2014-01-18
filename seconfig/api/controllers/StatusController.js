/**
 * StatusController
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
    
  'new': function (req, res, next) {
      res.view();
  },
  
  'create': function (req, res, next) {
      
      var statusTmp = {
          name: req.param('name'),
          description: req.param('description')
      };
      
      Status.create(statusTmp, function statusCreated(err, status){
          
          if (err) {
              console.log(err);
              req.session.flash = {
                  err: err
              };
              
              res.locals.flash = _.clone(req.session.flash);
              return res.redirect('/status/new');
          }
          
          status.save(function (err, status){
              if (err) return next(err);
              res.redirect('/status/show/' + status.name);
          });
      });
  },
  
  'show': function (req, res, next) {
      Status.findOne(req.param('name'), function foundStatus(err, status){
          
          if (err) return next(err);
          if (!status) return next();
          res.view({
              status: status
          });
      });
  },
  
  'index': function (req, res, next) {
      Status.find(function foundStatus(err, status){
          if (err) return next(err);
          res.view({
              status: status
          });
      });
  },


  edit: function (req, res, next) {
      
      // Find the item from the name passed in via params
      Status.findOne(req.param('name'), function foundStatus (err, status) {
          
          if (err) return next(err);
          if (!alert) return next();
          
          res.view({
              status: status
          });
      }); 
  },
  
  // process the infor from edit view
  update: function (req, res, next) {
      
      Status.update(req.param('name'), statusObj, function statusUpdate(err) {
          if (err) {
            return res.redirect('/status/edit/' + req.param('name'));
          }
          
          res.redirect('/status/show/' + req.param('name'));
      });
  },
  
  destroy: function (req, res, next) {
      
    Item.findOne(req.param('name'), function foundStatus(err, item){
        
        if (err) return next(err);
        if (!alert) return next('Status doesn\'t exist');
        
        Status.destroy(req.param('name'), function statusDestroyed(err){
            if (err) return next(err);
        });
        res.redirect('/status');
    });
  }

  
};
