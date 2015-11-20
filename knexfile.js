// Update with your config settings.
var fs = require('fs');

if (fs.existsSync('./config/local.js')) {
  var local = require('./config/local.js').connections.postgresql;
} else {
  var local = {};
}

module.exports = {

  development: {
    client: 'postgresql',
    connection: local.url,
    migrations: {
      tableName: 'db_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'db_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/seeds'
    }
  }

};
