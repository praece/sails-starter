/**
 * Module dependencies
 */
var _       = require('lodash');
var Promise = require('bluebird');
var util 		= require('util');

function logger() {

};

logger.prototype.log = function(type, log, model, id) {
	if (!type || !log) return;
	model = model || null;
	id = id || null;

	var log = {
		type: type,
		log: JSON.stringify(log, null, 2),
		stackTrace: log.stack,
		referenceModel: model,
		referenceId: id
	};

	sails.log.error(log, 'error');
	sails.log.error(log.stack, 'stackTrace');

	Log.create(log).then(_.noop);
};

logger.prototype.error = function(log, model, id) {
	this.log('error', log, model, id);
};

logger.prototype.warning = function(log, model, id) {
	this.log('warning', log, model, id);
};

logger.prototype.debug = function(log, model, id) {
	this.log('debug', log, model, id);
};

module.exports = new logger();
