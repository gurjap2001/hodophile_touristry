const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require("body-parser");
const port = 3007;
const flash = require('connect-flash');
const router = require('./routes/route');
const router2 = require('./routes/route_front');
const sequelize = require("./db/database");
const passport = require("passport");
require('./utils/passport');
const session = require('express-session');
//const blogs = require("./models/blog");
// const localStrategy = require("passport-local");
// const passportJWT = require("passport-jwt");
// JWTStrategy = passportJWT.Strategy;
//sequelize.sync();
app.use(session({
  secret:"secret",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use( function(req, res, next){
  res.locals.message = req.flash();
  next();
});
app.set('view engine', 'ejs');
app.set("views", "./views");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res,next){
  res.locals.currentUser = req.user;
  next();
})

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/assets_front', express.static(path.join(__dirname, 'assets_front')));
app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/img', express.static(path.join(__dirname, 'assets/images')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/vendor', express.static(path.join(__dirname, 'assets/vendors')));
// app.get("/",(req,res) =>{
//   res.render('index');
// })

app.use('/', router);
app.use('/',router2);


app.listen(port, () =>
  console.log(`Server is listening on port http://localhost:${port}...`)
);


