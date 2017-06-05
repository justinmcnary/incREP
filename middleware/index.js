let Report = require('../models/report');
let Comment = require('../models/comment');
//Middleware
var middlewareObj = {};

middlewareObj.checkReportOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
      Report.findById(req.params.id, (err, foundReport) => {
        if(err){
          req.flash('error', 'Report not found');
          res.redirect('back');
        } else {
          //does user own report
          if(foundReport.author.id.equals(req.user._id)){
            next();
          } else {
            req.flash('You do not have permission to do that');
            res.redirect('back');
          }
        }
      });
    } else {
      req.flash('error', 'You need to be logged in to do that')
      res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        req.flash('error', 'Comment not found');
        res.redirect('back');
      } else {
        //does user own comment
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', 'You do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You need to be logged in to do that');
  res.redirect('/login');
};

module.exports = middlewareObj