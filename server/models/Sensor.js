/**
 * Alert
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		::
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('sensor', {
  name: String,
  address: String,
  description: String
});

