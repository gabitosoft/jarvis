/**
 * AlertController
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
    
  subscribe: function (req, res) {
      
      Alert.find(function foundAlerts(err, alerts) {
          if (err) return next(err);
          
          // Subscribe this socket to the Alert model classroom
          Alert.subscribe(req.socket);
          
          // Subscribe this socket to the user instance rooms
          Alert.subscribe(req.socket, alerts);
          
          // This will avoid a warning from the socket for trying to render
          // html over the socket.
          res.send(200);
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AlertController)
   */
  _config: {}

  
};
