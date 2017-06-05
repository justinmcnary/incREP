let express      = require('express'),
  app            = express(),
  bodyParser     = require('body-parser'),
  mongoose       = require('mongoose'),
  flash          = require('connect-flash'),
  passport       = require('passport'),
  LocalStrategy  = require('passport-local'),
  methodOverride = require('method-override'),
  Report         = require('./models/report'),
  Comment        = require('./models/comment'),
  User           = require('./models/user'),
  seedDB         = require('./seed')

//Requiring Routes
let reportRoutes = require('./routes/reports'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index')

//Secure route for variables
require('dotenv').config({ path: 'variables.env' });

mongoose.connect('mongodb://localhost/inc_rep');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash()); //for flash messaging 

// seedDB(); //seed the database

//Passport Config
app.use(require('express-session')({
  secret: "TURBO HOCKEY IS LEGIT!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error'); //handles flash messages for errors
  res.locals.success = req.flash('success'); //handles flash messages for success
  next();
 });
app.use(indexRoutes);
app.use('/reports/:id/comments', commentRoutes);
app.use('/reports', reportRoutes); //dry up the route 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(process.env.PORT || 3000, function() {
  console.log('Incident Report server is running on port 3000');
});

