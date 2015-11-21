'use strict';

exports.up = function(knex, Promise) {
	return knex.schema.createTable('log', function(table) {
  	table.increments();
	  table.datetime('createdAt');
	  table.datetime('updatedAt');
  	table.json('log');
		table.text('stackTrace');
  	table.text('type');
  	table.text('referenceModel');
  	table.text('referenceId');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('log');
};
