/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	email: {
  		type: 'text',
  		isEmail: true,
  		unique: true,
  		required: true,
  		validateUnique: function(cb) {
        if (this.id) return cb(false);
        User.count({email: this.email}).then(cb);
      }
  	},
  	firstName: {
  		type: 'text',
  		required: true
  	},
  	lastName: {
  		type: 'text',
  		required: true
  	},
  	role: {
  		type: 'text',
  		required: true,
  		in: sails.config.constants.ROLES
  	},
  	timezone: {
  		type: 'text',
  		required: true,
  		defaultsTo: 'America/Los_Angeles'
  	},
  	status: {
  		type: 'text',
  		required: true,
  		defaultsTo: 'Active',
  		in: sails.config.constants.STATUSES
  	}
  }
};

