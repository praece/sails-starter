var passport = require('passport');
var _ 			 = require('lodash');

module.exports = function (req, res, done) {

  passport.authenticate('bearer', function(err, user, info) {
    if (err) return res.forbidden(err);
    if (!user || !_.includes(['Administrator'], user.role)) {
    	return res.forbidden({message: 'You are not authorized to access this page!'});
    }

    req.login(user, {session: false}, function(err) {
      if (err) { return done(err); }
      sails.config.user = user;
      done();
    });
  })(req, res, done);

};