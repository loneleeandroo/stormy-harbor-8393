// Dependencies
var path = require('path');
var _ = require('lodash');
var Collection = require(path.join(__dirname, '../../lib', 'collection'));

// Mock data
var request = {
  payload: [
    {
      drm: true,
      episodeCount: 3,
      image: {
        showImage: "http://catchup.ninemsn.com.au/img/jump-in/shows/16KidsandCounting1280.jpg"
      },
      slug: "show/16kidsandcounting",
      title: "16 Kids and Counting"
    },
    {
      drm: false,
      episodeCount: 4,
      image: {
        showImage: "http://catchup.ninemsn.com.au/img/jump-in/shows/TheTaste1280.jpg"
      },
      slug: "show/thetaste",
      title: "The Taste",
    },
    {
      drm: true,
      image: {
        showImage: "http://catchup.ninemsn.com.au/img/jump-in/shows/Thunderbirds_1280.jpg"
      },
      slug: "show/thunderbirds",
      title: "Thunderbirds"
    },
    {
      episodeCount: 5,
      image: {
        showImage: "http://catchup.ninemsn.com.au/img/jump-in/shows/Thunderbirds_1280.jpg"
      },
      slug: "show/thunderbirds",
      title: "Thunderbirds"
    },
    {
      image: {
        showImage: "http://catchup.ninemsn.com.au/img/jump-in/shows/ScoobyDoo1280.jpg"
      },
      slug: "show/scoobydoomysteryincorporated",
      title: "Scooby-Doo! Mystery Incorporated"
    }
  ]
}

var shows = new Collection(request.payload);

/*
 * Test Suite
 */
describe('Collection (Shows)', function() {
  /*
   * Checks Find
   */
  describe('Find', function () {
    it('should return all shows when selector is undefined', function () {

      var testArray = shows.find();

      testArray.should.have.lengthOf(request.payload.length);

    });

    it('should return all shows when selector is {}', function () {

      var testArray = shows.find();

      testArray.should.have.lengthOf(request.payload.length);

    });

    it('should return DRM shows when selector is {drm: true}', function () {

      var testArray = shows.find({drm: true});

      testArray.should.have.lengthOf(2);

      _.forEach( testArray, function(show) {
        show.drm.should.be.true;
      });

    });

    it('should return non-DRM shows when selector is {drm: false}', function () {

      var testArray = shows.find({drm: false});

      testArray.should.have.lengthOf(1);

      _.forEach( testArray, function(show) {
        show.drm.should.be.false;
      });

    });

    it('should return shows with an episode count > n when selector is {episodeCount: {$gt: n}}', function () {

      var testArray;

      // n = 0
      testArray = shows.find({episodeCount: {$gt: 0}});

      testArray.should.have.lengthOf(3);

      _.forEach( testArray, function(show) {
        show.episodeCount.should.be.above(0);
      });

      // n = 4
      testArray = shows.find({episodeCount: {$gt: 4}});

      testArray.should.have.lengthOf(1);

      _.forEach( testArray, function(show) {
        show.episodeCount.should.be.above(4);
      });

      // n = 5
      testArray = shows.find({episodeCount: {$gt: 5}});

      testArray.should.have.lengthOf(0);

      _.forEach( testArray, function(show) {
        show.episodeCount.should.be.above(5);
      });

    });

    it('should return shows with an episode count < n when selector is {episodeCount: {$lt: n}}', function () {

      var testArray;

      // n = 0
      testArray = shows.find({episodeCount: {$lt: 0}});

      testArray.should.have.lengthOf(0);

      _.forEach( testArray, function(show) {
        show.episodeCount.should.be.below(0);
      });

      // n = 4
      testArray = shows.find({episodeCount: {$lt: 4}});

      testArray.should.have.lengthOf(1);

      _.forEach( testArray, function(show) {
        show.episodeCount.should.be.below(4);
      });

      // n = 5
      testArray = shows.find({episodeCount: {$lt: 5}});

      testArray.should.have.lengthOf(2);

      _.forEach( testArray, function(show) {
        show.episodeCount.should.be.below(5);
      });

    });

    it('should return with properties image, slug and title only when fields is {image: 1, slug: 1, title: 1}', function () {

      var testArray = shows.find({}, {image: 1, slug: 1, title: 1});

      testArray.should.have.lengthOf(request.payload.length);

      _.forEach( testArray, function(show) {
        show.should.have.property('image')
        show.should.have.property('slug')
        show.should.have.property('title')
      });

    });

    it('should return without properties image, slug and title only when fields is {image: 0, slug: 0, title: 0}', function () {

      var testArray = shows.find({}, {image: 0, slug: 0, title: 0});

      testArray.should.have.lengthOf(request.payload.length);

      _.forEach( testArray, function(show) {
        show.should.not.have.property('image')
        show.should.not.have.property('slug')
        show.should.not.have.property('title')
      });

    });


  });
});
