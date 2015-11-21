'use strict';

var date = new Date();

exports.seed = function(knex, Promise) {
  return knex('user').insert({
  	email: 'support@praece.com', 
  	createdAt: date, 
  	updatedAt: date,
  	firstName: 'Praece',
  	lastName: 'Administrator',
  	role: 'Administrator',
    status: 'Active',
    timezone: 'America/Los_Angeles'
  });
};