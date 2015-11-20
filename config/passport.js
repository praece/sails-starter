var passport = require('passport');
var	BearerStrategy = require('passport-http-bearer').Strategy;
var	jwt = require('jsonwebtoken');

passport.use(new BearerStrategy({}, function(token, done) {
  var secret = new Buffer(sails.config.constants.AUTH_SECRET, 'base64');
  var audience = sails.config.constants.AUTH_AUDIENCE;

  jwt.verify(token, secret, {audience: audience}, function(err, decoded) {
    if (err) {
      return done(err);
    } else if (!decoded.email) {
      return done(null, false);
    } else {
      User.findOne({email: decoded.email}).exec(function(err, user){
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, {});
      });
    }
  });
}));

module.exports.http = {
	middleware: passport.initialize()
};