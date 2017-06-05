let Report = require('../models/report');
let Comment = require('../models/comment');
//Middleware
var middlewareObj = {};

middlewareObj.checkReportOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
      Report.findById(req.params.id, (err, foundReport) => {
        if(err){
          res.redirect('back');
        } else {
          //does user own report
          if(foundReport.author.id.equals(req.user._id)){
            next();
          } else {
            res.redirect('back');
          }
        }
      });
    } else {
      res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect('back');
      } else {
        //does user own comment
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

module.exports = middlewareObj