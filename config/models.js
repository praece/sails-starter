/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

var _       = require('lodash');
var Promise = require('bluebird');
var is      = require('is_js');

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  connection: 'postgresql',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'safe',

  description: {
    settings: {
      allowUpdate: [],
      forceDelete: [],
      search: [],
      backReference: {},
      calculatedFields: []
    }
  },

  types: {
    validateUnique: function(value, count) {
      return count ? false : true;
    },
    isEmail: function(value) {
      return is.email(value);
    },
    isPhone: function(value) {
      return is.nanpPhone(value);
    },
    isZip: function(value) {
      return is.usZipCode(value);
    }
  },

  search: function(where) {
    var Model = sails.models[this.identity];

    return SearchService.search(where, Model);
  },

  afterDestroy: function(records, cb) {
    var Model = sails.models[this.identity];

    Promise
      .all([
        NestedDeleteService.process(records, Model)
      ])
      .then(function() {
        cb();
      })
      .catch(function(err) {
        cb(err);
      });
  },

  afterFind: function(records) {
    var Model = sails.models[this.identity];

    return Promise
      .all([
        BackReferenceService.populate(records, Model),
        CalculatedFieldsService.populate(records, Model)
      ])
      .then(function() {
        return records;
      });
  }

};
