const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./model/user.js");
const userRouter = require("./routes/user.js");
const addressRouter=require("./routes/address.js")
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const db_url = process.env.ATALSDB_URL;

// DB connection
main()
  .then((res) => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db_url);
}

// store config
const store = MongoStore.create({
  mongoUrl: db_url,
  crypto: { secret: process.env.secret },
  tochAfter: 24 * 3600,
});
store.on("error", (err) => {
  console.log("Error in Mongo session store", err);
});

// session options
const sessionOptions = session({
  store: store,
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
});

// middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);
app.use(sessionOptions);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// getway routes
app.get("/", (req, res) => {
  if(req.user){
    return res.redirect(`/users/${req.user._id}/addresses`)
  }
  res.redirect("/signup");
});

// middleware for flash
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// routes 
app.use("/users/:userid/addresses",addressRouter );
app.use("/", userRouter);


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong!" } = err;
  res.render("pages/error.ejs", { message });
});


// listenning at port 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
