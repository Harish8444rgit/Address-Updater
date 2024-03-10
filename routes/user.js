const express=require("express");
const router=express.Router();
const passport=require("passport");
const {
  validateSignup,
  wrapAsync,
} = require("../utils/middleware");
const UserController=require("../controller/user");

router.route("/signup")
.get( UserController.signupForm)
.post(validateSignup,wrapAsync(UserController.signup));


router.route("/login")
.get(UserController.loginFrom)
.post(passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login",
}), UserController.login);
  
router.get('/logout',UserController.logout);


module.exports=router;