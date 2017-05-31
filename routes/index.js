let express = require('express');
let router = express.Router();
let passport = require('passport');
let User = require('../models/user');
let Report = require('../models/report');

//ROUTE ROUTE
router.get('/', (req, res) => {
  res.render('landing');
});

//Index Route
router.get('/reports', (req, res) => {
  //Geat all campgrounds
  Report.find({}, (err, allReports)=> {
    if(err){
      console.log(`There was an error ${err}`);
    } else{
      res.render('reports/index', {reports:allReports, currentUser: req.user});
    }
  });
});

// AUTH ROUTES
//Show form
router.get('/register', (req, res) => {
  res.render('register');
});

//SIGNUP LOGIC
router.post('/register', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/reports');
    });
  });
});

//SHOW LOGIN form
router.get('/login', (req, res) => {
  res.render('login');
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
  res.redirect('/reports');
});

//Prevents users from commenting unless logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;