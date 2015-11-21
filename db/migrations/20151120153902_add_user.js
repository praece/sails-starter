'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
  	table.increments();
	  table.datetime('createdAt');
	  table.datetime('updatedAt');
	  table.text('email').unique();
	  table.text('firstName');
	  table.text('lastName');
	  table.text('role');
	  table.text('timezone');
	  table.text('status');
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
