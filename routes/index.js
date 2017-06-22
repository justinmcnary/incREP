let express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    User     = require('../models/user'),
    Report   = require('../models/report')

//ROUTE ROUTE
router.get('/', (req, res) => {
  res.render('landing');
});

//Index Route
router.get('/reports', (req, res) => {
  //Get all reports
  Report.find({}, (err, allReports)=> {
    if(err){
      req.flash('error', err);
      console.log(`There was an error ${err}`);
    } else{
      res.render('reports/index', {reports:allReports, page: 'reports', currentUser: req.user});
    }
  });
});

//About Route
router.get('/about', (req, res) => {
  res.render('about');
});

// AUTH ROUTES
//Show form
router.get('/register', (req, res) => {
  res.render('register', {page: 'register'});
});

//SIGNUP LOGIC
router.post('/register', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      // req
      console.log(err);
      return res.render('register', {error: err.message});
    }
    passport.authenticate('local')(req, res, function(){
      req.flash('success', `Welcome to Incident Report ${user.username}`);
      res.redirect('/reports');
    });
  });
});

//SHOW LOGIN form
router.get('/login', (req, res) => {
  res.render('login', {page: 'login'});
});

//handling login logic
router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/reports',
    failureRedirect: '/login'
  }), (req, res) => {
});

//LOGOUT ROUTE
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have succesfully logged out');
  res.redirect('/reports');
});

module.exports = router;