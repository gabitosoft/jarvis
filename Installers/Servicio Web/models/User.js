/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		::
 */

var mongoose = require('mongoose');

module.exports = mongoose.model('user', {
  name: String,
  email: String,
  admin: Boolean,
  encryptedPassword: String,
  token: String,
  online: Boolean,
  settings: {
    allAlerts: Boolean,
    unknowAlerts: Boolean,
    informationAlerts: Boolean,
    warningAlerts: Boolean,
    dangerAlerts: Boolean,
    chartSensor: Boolean,
    chartType: Boolean,
    language: String
  }
});

