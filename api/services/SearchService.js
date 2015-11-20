/**
 * Module dependencies
 */
var _       = require('lodash');
var Promise = require('bluebird');

module.exports = {
  search: function(where, Model) {
    var settings = Model.description.settings;

    if (!where.q || settings.search.length === 0) return Promise.resolve(where);
    
    var table = Model.adapter.identity;
    var search = Promise.promisify(User.query);
    var searchString = '';

    _.forEach(settings.search, function(column, index) {
      searchString += '"' + table + '"."' + column + '"';
      if (index < settings.search.length - 1) searchString += ' || \' \' || ';
    });

    var query = 'SELECT "' + table + '"."id" FROM "' + table + '" WHERE ' + searchString + ' ILIKE \'%\'||$1||\'%\'';

    return search(query, [where.q])
      .then(function(results) {
        where.id = _.pluck(results.rows, 'id');
        delete where.q;

        return where;
      });
  }
};