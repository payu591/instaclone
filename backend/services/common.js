const passport = require("passport");

module.exports.sanitizeUser = (user) => {
  return { id: user.id };
};

module.exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};

module.exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    console.log(req.cookies['jwt']);
    token = req.cookies['jwt'];
  }
  return token;
  // nishant 
  // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTQ2MWUyOTM0MzJiY2IzNjdhODJjMSIsImlhdCI6MTY5NzExMTM2M30.I1Xkb6lcsHqUyi0_ko_8dtPVXFKHBpd4-mjE5cgCfxA";
  // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTQ3NWU1OWM0Mjk3YThjMGJmYTYwYiIsImlhdCI6MTY5NjM5MzA0Nn0.pFtZ-xy-sDy1poANj8gl5FZQ_hqvllP2L9np_DHoXw4";
}


