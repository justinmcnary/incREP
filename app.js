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

// mongoose.connect('mongodb://localhost/inc_rep'); //local
mongoose.connect('mongodb://mcnasty:blackhawks!@ds111882.mlab.com:11882/increp'); //Mlab
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


// app.listen(process.env.PORT || 3000, function() {
//   console.log('Incident Report server is running on port 3000');
// });

let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
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

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
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
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};