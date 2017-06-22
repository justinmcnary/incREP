let express     = require('express'),
    router      = express.Router(),
    Report      = require('../models/report'),
    Comment     = require('../models/comment'),
    middleware  = require('../middleware'),
    geocoder    = require('geocoder')


//Create New report and add it to the database
router.post('/', middleware.isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description= req.body.description;
  let severity= req.body.severity;
  let height = req.body.height;
  let weight = req.body.weight;
  let age = req.body.age;
  let sex = req.body.sex;
  let race = req.body.race;

  let author = {
    id: req.user._id,
    username: req.user.username
  };

//handle google maps api
  geocoder.geocode(req.body.location, (err, data) => {
    let lat = data.results[0].geometry.location.lat;
    let lng = data.results[0].geometry.location.lng;
    let location = data.results[0].formatted_address;
    let newReport = {name: name, image: image, severity: severity, description:description, height: height, weight: weight, age: age, sex: sex, race: race, author:author, location: location, lat: lat, lng: lng};

    //Create new report and save to DB
    Report.create(newReport, (err, newlyCreated) => {
      if(err){
        console.log(err);
      } else{
        res.redirect('/reports');
      }
    });
  });
});

//NEW displays form to make new report
router.get('/new', middleware.isLoggedIn, (req, res) => {
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

//EDIT REPORT ROUTE
router.get('/:id/edit', middleware.checkReportOwnership, (req, res) => {
  Report.findById(req.params.id, (err, foundReport) => {
    res.render('reports/edit', {report: foundReport});
  });
});


//UPDATE REPORT ROUTE
router.put('/:id', middleware.checkReportOwnership, (req, res) => {
    geocoder.geocode(req.body.location, function (err, data) {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
      var newData = {name: req.body.name, image: req.body.image, description: req.body.description, severity: req.body.severity, height: req.body.height, weight: req.body.weight, age: req.body.age, sex: req.body.sex, race: req.body.race, location: location, lat: lat, lng: lng};

    Report.findByIdAndUpdate(req.params.id, {$set: newData}, (err, report)=> {
      if(err) {
        req.flash('error', err.message);
        res.redirect('back');
      } else {
        req.flash('success', 'Successfully Updated!');
        res.redirect(`/reports/${req.params.id}`);
      }
    });
  });
});

//DESTROY REPORT ROUTE
router.delete('/:id', middleware.checkReportOwnership, (req, res) => {
  Report.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      res.redirect('/reports');
    } else {
      res.redirect('/reports');
    }
  })
});

module.exports = router;