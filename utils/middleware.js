const ExpressError = require("./ExpressError");
const { addressSchema, userSignupSchema } = require("./schema");

module.exports.wrapAsync=(fn) =>{
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
}
// checking for loggedin
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to make changes");
    return res.redirect("/login");
  }
  next();
};
// validation  for address schema
module.exports.validateaddress = (req, res, next) => {
  let { error } = addressSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((ele) => ele.message).join(",");
    throw new ExpressError(400, error);
  } else {
    next();
  }
};
// validation  for user schema
module.exports.validateSignup = (req, res, next) => {
  const { error } = userSignupSchema.validate(req.body);
  if (error) {
    console.log(error);
    const errMsg = error.details.map((ele) => ele.message).join(",");
    next(new ExpressError(400, errMsg));
  } else {
    next();
  }
};
