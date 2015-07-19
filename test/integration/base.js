// Dependencies
var path = require('path');
var requestClient = require('supertest');
var _ = require('lodash');
var Collection = require(path.join(__dirname, '../../lib', 'collection'));

// Mock data
var request = require(path.join(__dirname, '../mock', 'request'));
var response = require(path.join(__dirname, '../mock', 'response'));

describe('Routes', function() {
  describe('/', function () {
    it('GET should return OK', function (done) {

      requestClient('http://localhost:5000').get('/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            res.body.should.eql({response: 'OK'});
            done();
        });

    });

    it('POST should return DRM shows with more than 0 episodes with properties image, slug and title only.', function (done) {

      requestClient('http://localhost:5000').post('/')
        .send(request)
        .type('json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            res.body.should.eql(response);
            done();
        });

    });

    it('POST should return custom error if invalid JSON is received.', function (done) {

      requestClient('http://localhost:5000').post('/')
        .send('{"invalid"}')
        .type('json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            res.error.text.should.equal('{"error":"Could not decode request: JSON parsing failed"}');
            done();
        });

    });

  });
});
