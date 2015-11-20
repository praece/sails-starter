var passport = require('passport');

module.exports = function (req, res, done) {

  passport.authenticate('bearer', function(err, user, info) {
    if (err) return res.forbidden(err);
    if (!user) return res.forbidden({message: 'You are not authorized to access this page!'});

    req.login(user, {session: false}, function(err) {
      if (err) { return done(err); }
      sails.config.user = user;
      done();
    });
  })(req, res, done);

};