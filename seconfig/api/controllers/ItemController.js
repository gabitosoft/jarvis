/**
 * ItemController
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
      
    var itemObj = {
      name: req.param('name'),
      itemStatus: req.param('itemStatus')
    };
    
    Item.create(alertObj, function itemCreated(err, item) {
        
        // If there's an error
        if (err) {
            
            console.log(err);
            req.session.flash = {
                err: err
            };

            // If error redirect back to sign-up page
            return res.redirect('/item/new');
        }
        
        Item.save(function(err, item) {
            if (err) return next(err);
            
            res.redirect('/item/show/' + item.id);
        });
    });
  },
  
  show: function (req, res, next) {

    item.findOne(req.param('id'), function foundItem (err, item){
        
        if (err) return next(err);
        if (!item) return next();
        res.view({
            item: item
        });
    });
  },
  
  index: function(req, res, next) {
      
      // Get an array of all items in the Item collection(e.g table)
      Item.find(function foundItem (err, items) {
          if (err) return next(err);
          // pass the array down to the /views/index.ejs page
          res.view({
              items: items
          });
      });
  },
  
  edit: function (req, res, next) {
      
      // Find the item from the id passed in via params
      Item.findOne(req.param('id'), function foundItem (err, item) {
          
          if (err) return next(err);
          if (!item) return next();
          
          res.view({
              item: item
          });
      }); 
  },
  
  // process the infor from edit view
  update: function (req, res, next) {
      
      Item.update(req.param('id'), itemObj, function itemUpdate(err) {
          if (err) {
            return res.redirect('/item/edit/' + req.param('id'));
          }
          
          res.redirect('/item/show/' + req.param('id'));
      });
  },
  
  destroy: function (req, res, next) {
      
    Item.findOne(req.param('id'), function foundItem(err, item){
        
        if (err) return next(err);
        if (!item) return next('Item doesn\'t exist');
        
        Item.destroy(req.param('id'), function itemDestroyed(err){
          if (err) return next(err);
        });
        res.redirect('/item');
    });
  }  
};
