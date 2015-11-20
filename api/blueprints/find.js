/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _          = require('lodash');

/**
 * Find Records
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the data adapter
 * using the specified criteria.  If an id was specified, just the instance
 * with that unique id will be returned.
 *
 * Optional:
 * @param {Object} where       - the find criteria (passed directly to the ORM)
 * @param {Integer} limit      - the maximum number of records to send back (useful for pagination)
 * @param {Integer} skip       - the number of records to skip (useful for pagination)
 * @param {String} sort        - the order of returned records, e.g. `name ASC` or `age DESC`
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findRecords (req, res) {

  // Look up the model.
  var Model = actionUtil.parseModel(req);
  var where = actionUtil.parseCriteria(req);

  // Merge in our defaults.
  where = _.merge({}, FilterService.defaults(Model), where);

  // If an `id` param was specified, use the findOne blueprint action
  // to grab the particular instance with its primary key === the value
  // of the `id` param.   (mainly here for compatibility for 0.9, where
  // there was no separate `findOne` action).
  if ( actionUtil.parsePk(req) ) {
    return require('./findOne')(req,res);
  }

  // Lookup for records that match the specified criteria.
  Model.search(where)
    .then(function(updatedWhere){
      return Model.find()
        .where( updatedWhere )
        .limit( actionUtil.parseLimit(req) )
        .skip( actionUtil.parseSkip(req) )
        .sort( actionUtil.parseSort(req) )
        .populateAll()
        .then(Model.afterFind);
    })
    .then(function(records) {
      return res.ok(records);
    })
    .catch(function(err) {
      LogService.error(err);
      
      return res.serverError(err);
    });
};
