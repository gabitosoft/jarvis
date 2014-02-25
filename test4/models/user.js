/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */


var User = mongoose.model('user', {
  name:{
    type: 'string',
    required: true
  },
  email:{
    type:'string',
    email: true,
    required: true,
    unique: true
  },
  admin: {
    type: 'boolean',
    defaultsTo: false
  },
  encryptedPassword:{
    type:'string'
  },

  online: {
    type: 'boolean',
    defaultsTo: false
  }
});