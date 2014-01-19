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
          
          status.save(function (err, status) {
              if (err) return next(err);
              res.redirect('/status/show/' + status.id);
          });
      });
  },
  
  'show': function (req, res, next) {
      Status.findOne(req.param('id'), function foundStatus(err, status){
          
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
      
      // Find the item from the id passed in via params
      Status.findOne(req.param('id'), function foundStatus (err, status) {
          
          if (err) return next(err);
          if (!status) return next();
          
          res.view({
              status: status
          });
      }); 
  },
  
  // process the information from edit view
  update: function (req, res, next) {

      var statusObj = {
          name: req.param('name'),
          description: req.param('description')
      };

      Status.update(req.param('id'), statusObj, function statusUpdate(err) {
          if (err) {
            return res.redirect('/status/edit/' + req.param('id'));
          }
          
          res.redirect('/status/show/' + req.param('id'));
      });
  },
  
  destroy: function (req, res, next) {
      
    Status.findOne(req.param('id'), function foundStatus(err, status) {
        
        if (err) return next(err);
        if (!status) return next(res.i18n('status').noExist);
        
        Status.destroy(req.param('id'), function statusDestroyed(err) {
            if (err) return next(err);
        });
        res.redirect('/status');
    });
  }
};
