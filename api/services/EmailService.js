/**
 * Module dependencies
 */
var moment    = require('moment-timezone');
var env       = process.env.NODE_ENV || 'development';

/**
 * Schedule automatic emails
 */
sails.after('ready', function() {
  var tz = sails.config.constants.TIMEZONE;
  var today = moment().tz(tz).startOf('day').hour(1);
  var endOfWorkDay = moment().tz(tz).startOf('day').hour(19);
  var wednesday = moment().tz(tz).startOf('day').day(3).hour(1);
  var friday = moment().tz(tz).startOf('day').day(5).hour(1);
  var fridayTwoAM = moment().tz(tz).startOf('day').day(5).hour(2);
  var everyDay = {day: 1};
  var everyWeek = {day: 7};

  if (env === 'production') {
	  // Add any scheduled emails here!
  }
});

module.exports = {
	
};

