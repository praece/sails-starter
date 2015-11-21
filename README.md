# Sails Starter App

A starter sails app for Praece Consulting. Includes the following:
- Auth via jsonwebtoken
- A user model and controller for use with auth
- Custom blueprints that include count
- Config defaults
	- Disable sessions and grunt asset pipeline
	- Set baseurl prefix to /api
	- Disable views
	- Count routes for all models
	- Aisabled destroy routes for all controllers / models
- Some built-in services
	- Back references automatic reverse 1:1 references
	- Calculated fields fields that are calculated and automatically included in the API response
	- Cron built for Heroku / Dokku
	- A database seeding / cleaning service
	- A scheduled email service and basic gmail smtp config
	- Filter service for default model filters for blueprints
	- Log service for logging to the database and sending log emails
	- Nested delete for automatically deleting nested resources
	- Nested update service for handling updated nested resources
	- Search service for single value multi field search
