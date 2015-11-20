/**
 * Module dependencies
 */
var request = require('request-promise');
var _       = require('lodash');
var Promise = require('bluebird');

/**
 * FilterUtil Service
 *
 * Used to do application specific search and filtering.
 */

module.exports = {
  defaults: function(Model) {
    var defaults = {};

    // By default make sure the items we are returning are active.
    if (Model._attributes.status) defaults.status = 'active';

    return defaults;
  }
};