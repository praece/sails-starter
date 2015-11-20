var fs = require('fs');
var _ = require('lodash');

// Add any custom routes we need.
var routes = {
  '/api': {
    view: 'homepage'
  }
};

// Add a custom count route for each model.
_.forEach(fs.readdirSync('api/models'), function(file) {
  if (!_.endsWith(file, '.js')) return;

  var model = file.slice(0, -3).toLowerCase();
  routes['GET /api/' + model + '/count'] = [
    {
      policy: 'token'
    }, { 
      blueprint: 'count', 
      model: model 
    }
  ];
});

module.exports.routes = routes;
