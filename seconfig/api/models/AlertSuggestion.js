/**
 * AlertSuggestion
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,
  attributes: {
    order: {
      type: 'string',
      required: true
    },
    idAlert: {
      type: 'integer',
      required: true
    },
    idSuggestion: {
      type: 'integer',
      required: true
    },
    action: {
      type: 'string'
    }
  }
};
