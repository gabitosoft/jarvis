/**
 * Session
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        ::
 */

var mongoose = require('mongoose');

module.exports = mongoose.model('session', {
    id: String,
    username: String
});

