/**
 * AlertItem
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,
  attributes: {
  	
  	id:{
        type: 'integer',
        required: true
    },
    idAlert: {
        type: 'integer',
        required: true
    },
    idItem: {
        type: 'integer',
        required: true
    }
  }

};
