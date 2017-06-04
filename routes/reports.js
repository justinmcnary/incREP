let express = require('express');
let router = express.Router();
let Report = require('../models/report');

//Create New report and add it to the database
router.post('/', isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description= req.body.description;
  let height = req.body.height;
  let weight = req.body.weight;
  let age = req.body.age;
  let sex = req.body.sex;
  let race = req.body.race;

  let author = {
    id: req.user._id,
    username: req.user.username
  };

  let newReport = {name: name, image: image, description:description, height: height, weight: weight, age: age, sex: sex, race: race, author:author};

  //Create new report and save to DB
  Report.create(newReport, (err, newlyCreated) => {
    if(err){
      console.log(err);
    } else{
      res.redirect('/reports');
    }
  });
});

//NEW displays form to make new report
router.get('/new', isLoggedIn, (req, res) => {
  res.render('reports/new');
});

//shows info about one report
router.get('/:id', (req, res) => {
  Report.findById(req.params.id).populate('comments').exec((err, foundReport) => {
    if(err){
      console.log(err)
    } else {
      res.render('reports/show', {report: foundReport});
    }
  });
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;