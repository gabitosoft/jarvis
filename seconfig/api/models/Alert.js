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
    
//    server: {
//      type: 'string',
//      required: true
//    },
    name:{
      type: 'string',
      required: true
    },
    rules:{
      type: 'string',
      max: 4000
    },
    area: {
      type: 'string',
      required: true
    },
    priority: {
      type: 'string',
      required: true
    },
    suggestions: {
      type: 'array'
    }
  }
};
