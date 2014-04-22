module.exports.connect = function(config) {
	// Connection with the  database
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://'+config.db.server + ':' + config.db.port +'/' + config.db.name);
}