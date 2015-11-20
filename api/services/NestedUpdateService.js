/**
 * Module dependencies
 */
var _       = require('lodash');
var Promise = require('bluebird');

/**
 * Update Nested Records
 *
 * A method for updating nested records.
 */
function nestedUpdates(values, Model) {
  var promiseProps = {};
  var settings = Model.description.settings;

  _.forEach(Model.associations, function(association) {

    // If this is a model association to another single instance of a model
    // it's likely they just accidently passed in the object instead of the
    // id. So we just switch the id out for the object.
    if (association.type === 'model' && _.isObject(values[association.alias])) {
      values[association.alias] = values[association.alias].id;
    }

    // If this is a collection association passing the save through already works,
    // unless the array is empty, in which case we just want to kill it anyway.
    if (association.type === 'collection' && _.isArray(values[association.alias])) {

      // Only update associations that aren't empty or that don't 
      if (_.size(values[association.alias]) > 0 && _.includes(settings.allowUpdate, association.alias)) {
        var nestedModel = sails.models[association.collection];
        var nestedRecords = _.cloneDeep(values[association.alias]);
        var updates = {};
        var promises = [];
        delete values[association.alias];

        _.forEach(nestedRecords, function(nestedValues){
          if (nestedValues.id) {

            // This has an id, so its a nested update, check it for further
            // nested updates and return the results.
            promises.push(nestedUpdates(nestedValues, nestedModel)
              .then(function(nestedUpdates) {
                updates = nestedUpdates;

                return nestedModel.update(nestedValues.id, nestedValues)
              })
              .then(function(nestedRecords) {
                nestedRecord = nestedRecords.shift();

                return _.assign(nestedRecord, updates);
              }));
          } else {

            // This does not have an id so its a new instance that we need to attempt to save.
            nestedValues[association.via] = values.id;
            promises.push(nestedModel.create(nestedValues));
          }
        });

        promiseProps[association.alias] = Promise.all(promises);
      } else {
        delete values[association.alias];
      }      
    }
  });

  return Promise.props(promiseProps);
}

module.exports = function(values, Model) {
  return nestedUpdates(values, Model);
};