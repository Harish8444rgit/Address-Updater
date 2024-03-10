const User = require("../model/user");

module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  let { username, email, password } = req.body;
  const newUser = new User({ email, username });
  await User.register(newUser, password);
  req.flash("success","successfully register login with username & password ! ");
  res.redirect(`/login`);
};

module.exports.loginFrom = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to Address Updater");
  res.redirect(`/users/${req.user._id}/addresses`);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged you out!");
    res.redirect("/");
  });
};
