/**
 * UserController
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
    
  'summary': function(req, res, next) {
    return res.view();
  },

  'new': function(req, res, next) {
    res.view();
  },

  'create': function(req, res, next) {
    var userObj = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    }

    User.create( userObj, function userCreated(err, user){

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('user/new');
      }

      // Review the next two lines maybe we want create user from admin page
      req.session.authenticated = true;
      req.session.User = user;

      res.redirect('/user');
    });
  },

  'show': function (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },

  'index': function(req, res, next) {
    User.find(function foundUsers (err, users) {
      if (err) return next(err);
      res.view({
        users: users
      });
    });
  },

  'edit': function (req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user){
      if (err) return next(err);
      if (!user) return next(i18n('user').noExist);

      res.view({
        user: user
      });
    });
  },

  'update': function (req, res, next) {

    if (req.session.User.admin) {
      var userObj = {
        name: req.param('name'),
        email: req.param('email'),
        admin: req.param('admin')
      }
    } else {
      var userObj = {
        name: req.param('name'),
        email: req.param('email')
      }
    }

    User.update(req.param('id'), userObj, function userUpdated(err){
      if (err) {
        return res.redirect('/user/edit' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },

  'destroy': function (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);

      if (!user) return next(i18n('user').noExist);

      User.destroy(req.param('id'), function userDestroyed(err){
        if (err) return next(err);
      });

      res.redirect('/user');
    });
  },


  subscribe: function (req, res) {
    User.find(function foundUser(err, users){
      if (err) return next(err);

      // subscribe this socket to the User model classroom
      User.subscribe(req.socket);

      // subscribe this socket to the user instance room
      User.subscribe(req.socket, users);
    });
  },

  _config: {}

  
};
