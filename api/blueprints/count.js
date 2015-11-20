/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _          = require('lodash');

/**
 * Count Records
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

module.exports = function countRecords (req, res) {

  // Look up the model.
  var Model = actionUtil.parseModel(req);
  var where = actionUtil.parseCriteria(req);

  // Merge in our default filters.
  where = _.merge({}, FilterService.defaults(Model), where);

  // Lookup records that match the specified criteria.
  Model.search(where)
    .then(function(updatedWhere) {
      // If our search returned an empty set of ids we know we can return 0.
      if (updatedWhere.id && _.isArray(updatedWhere.id) && updatedWhere.id.length === 0) return 0;

      return Model.count()
        .where(updatedWhere);
    })
    .then(function(count) {
      return res.ok({count: count});
    })
    .catch(function(err) {
      LogService.error(err);

      return res.serverError(err);
    });
};
