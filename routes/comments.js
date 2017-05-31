let express = require('express');
let router = express.Router({mergeParams:true}); //allows you to dry route
let Report = require('../models/report');
let Comment = require('../models/comment');

//COMMENTS NEW
router.get('/new', isLoggedIn, (req, res) => {
  //find report by id
  Report.findById(req.params.id, (err, report) => {
    if(err) {
      console.log(err);
    } else {
      res.render('comments/new', {report: report});
    }
  });
});

//COMMENTS CREATE
router.post('/', isLoggedIn, (req, res) => {
//Lookup report by id
  Report.findById(req.params.id, (err, report) => {
    if(err) {
      console.log(err);
      res.redirect('/reports');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err) {
          console.log(err);
        } else {
          //add username and ID then save comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          report.comments.push(comment);
          report.save();
          res.redirect(`/reports/${report._id}`);
        }
      })
    };
  })
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;