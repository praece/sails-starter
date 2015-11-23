/**
 * Module dependencies
 */
var moment    = require('moment-timezone');
var Promise   = require('bluebird');
var send      = Promise.promisify(sails.hooks.email.send);

/**
* Log.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

function sendEmail(log) {
	var tz = sails.config.constants.TIMEZONE;
	log.humanCreatedAt = moment(log.createdAt).tz(tz).format('M/D/YY h:mmA');

	return send(
		'addedToLog',
    {
      log: log,
      basePath: sails.config.constants.BASE_PATH
    },
    {
      to: sails.config.constants.LOG_EMAIL,
      subject: 'Error Log - ' + sails.config.constants.ENVIRONMENT + ': An error was added to the log'
    }
	);
}

module.exports = {
  attributes: {
  	type: {
  		type: 'text'
  	},
  	log: {
  		type: 'json'
  	},
    stackTrace: {
      type: 'text'
    },
  	referenceModel: {
  		type: 'text'
  	},
  	referenceId: {
  		type: 'integer'
  	}
  },

  beforeCreate: function (values, cb) {
    sendEmail(values);

    return cb();
  }
};

