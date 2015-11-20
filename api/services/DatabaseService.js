// Database management service - DatabaseService.js
var _              = require('lodash');
var Promise        = require('bluebird');
var moment         = require('moment-timezone');
var env            = process.env.NODE_ENV || 'development';
var allowSeed      = process.env.ALLOW_SEED || false;

module.exports = {
  seeding: false,
  wipe: function() {
    
    // No wiping in production.
    if (env === 'production' && !allowSeed) return Promise.reject('Cannot seed on production!');
    var promises = [];

    _.forEach(sails.models, function(Model, index){
      if (_.includes([/* put the models you want to exclude here! */], index)) return;

      promises.push(Model.find({})
        .then(function(data){
          if (data.length) {
            console.log('Found ' + data.length + ' records, wiping ' + Model.adapter.identity + ' data.');

            return Model.destroy({});
          } else {
            console.log('Skipping ' + Model.adapter.identity + ', nothing to wipe.');
            return true;
          }
        }));
    });

    return Promise.all(promises);
  },

  seed: function(numContracts) {

    // No seeding in production.
    if (env === 'production' && !allowSeed) return Promise.reject('Cannot seed on production!');

    DatabaseService.seeding = true;

    return Promise.resolve(true)
      .finally(function() {
        DatabaseService.seeding = false;
      });
  }
};