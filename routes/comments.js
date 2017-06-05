let express = require('express');
let router = express.Router({mergeParams:true}); //allows you to dry route
let Report = require('../models/report');
let Comment = require('../models/comment');
let middleware = require('../middleware');

//COMMENTS NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
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
router.post('/', middleware.isLoggedIn, (req, res) => {
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

//COMMENTS EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) =>{
  Comment.findById(req.params.comment_id, (err, foundComment)=> {
    if(err) {
      res.redirect('back');
    } else{
      res.render('comments/edit', {report_id: req.params.id, comment: foundComment});
    }
  })
});

//COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err) {
      res.redirect('back');
    } else {
      res.redirect(`/reports/${req.params.id}`);
    }
  })
});

//COMMENT DESTROY
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if(err){
      res.redirect('back');
    } else {
      res.redirect(`/reports/${req.params.id}`);
    }
  })
});

module.exports = router;