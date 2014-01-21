/**
 * Alert
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,
  attributes: {
    
    name:{
      type: 'string',
      required: true
    },
    description:{
      type: 'string',
      max: 2000
    },
    type: {
      type: 'string',
      required: true
    },
    priority: {
      type: 'integer',
      required: true
    },
    idService: {
      type: 'integer',
      required: true
    }
  }
};
