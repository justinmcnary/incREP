let mongoose = require('mongoose');
let Report = require('./models/report');
let Comment = require('./models/comment');

let data = [
  {name: 'Jacob Tamme', image:'https://farm4.staticflickr.com/3070/2780945149_88f3b9a193.jpg',
  description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'
  },
  {name: 'Hilary Nuisance', image:'https://farm2.staticflickr.com/1236/1441517183_8dee8174eb.jpg',
    description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'
  },
  {name: 'Joseph NutBag', image:'https://farm4.staticflickr.com/3074/3087016574_efb07bd162.jpg',
    description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'
    }
]

function seedDB() {
  //Remove all reports
  Report.remove({}, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('Removed Reports!')
    }
  });
  // add a few reports
  // data.forEach((seed) => {
  //   Report.create(seed, (err, report) => {
  //     if(err) {
  //       console.log(err);
  //     } else {
  //       console.log('added a report');
  //       //create a comment
  //       Comment.create(
  //         {
  //         text:'This nob was dealing in the restroom',
  //         author: 'Homer'
  //       }, (err, comment) => {
  //         if(err) {
  //           console.log(err);
  //         } else {
  //           report.comments.push(comment);
  //           report.save();
  //           console.log('Comment Created');
  //         }
  //       });
  //     }
  //   });
  // }); 
};

module.exports = seedDB;