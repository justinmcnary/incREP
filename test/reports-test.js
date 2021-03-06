const Index = require('../routes/index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../app.js');

const should = chai.should();

chai.use(chaiHttp);

describe('Reports', function() {
  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    return runServer();
  });

  // Close server after these tests run in case
  // we have other test modules that need to 
  // call `runServer`. If server is already running,
  // `runServer` will error out.
  after(function() {
    return closeServer();
  });
  // `chai.request.get` is an asynchronous operation. When
  // using Mocha with async operations, we need to either
  // return an ES6 promise or else pass a `done` callback to the
  // test that we call at the end. We prefer the first approach, so
  // we just return the chained `chai.request.get` object.
  it('should list reports on GET', function() {
    return chai.request(app)
      .get('/reports')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.html;
        });
      });
  });