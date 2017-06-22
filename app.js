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
  User           = require('./models/user')


//Requiring Routes
let reportRoutes  = require('./routes/reports'),
    commentRoutes = require('./routes/comments'),
    indexRoutes   = require('./routes/index')

mongoose.Promise = global.Promise;
mongoose.connect
('mongodb://mcnasty:blackhawks!@ds111882.mlab.com:11882/increp'); //Mlab
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash()); //for flash messaging 


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

let server;

// this function starts our server and returns a Promise.
function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Incident Report is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

// like `runServer`, this function also needs to return a promise..
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node app.js`), this block
// runs.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};