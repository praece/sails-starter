/**
 * Module dependencies
 */
var schedule = require('node-schedule');
var moment   = require('moment-timezone');
var _        = require('lodash');
var Promise  = require('bluebird');

module.exports = {
	/**
	 * Schedule a job using node scheduler
	 * @param  {object}   date   the date & time for first job execution
	 * @param  {object}   offset object with moment offset keys and values
	 * @param  {Function} fn     the function to run
	 */
	scheduleJob: function(date, offset, fn) {
		date = date.tz(sails.config.constants.TIMEZONE) || moment().tz(sails.config.constants.TIMEZONE).startOf('day');
		now = moment().tz(sails.config.constants.TIMEZONE);
		offset = offset || {days: 1};
		var method = Promise.method(fn);

		while (date < now) {
			_.forEach(offset, function(amount, type) {
				date.add(amount, type);
			});
		}

		var job = schedule.scheduleJob(date.toDate(), function() {
			_.forEach(offset, function(amount, type) {
				date.add(amount, type);
			});

			CronService.scheduleJob(date, offset, fn);

			method()
				.catch(function(err) {
					LogService.error(err);
				});
		});
	}
};