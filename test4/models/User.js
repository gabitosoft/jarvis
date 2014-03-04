/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		::
 */

//module.exports = function() {
//  var mongoose = require('mongoose');
//  var User = mongoose.model('user', {
//    name: 'string',
//    email: 'string',
//    admin: 'boolean',
//    encryptedPassword: 'string',
//    online: 'boolean'
//  });
//}
var mongoose = require('mongoose');

module.exports = mongoose.model('user', {
  name: String,
  email: String,
  admin: Boolean,
  encryptedPassword: String,
  online: Boolean
});

