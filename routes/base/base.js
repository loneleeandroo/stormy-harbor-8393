var path = require('path');
var _ = require('lodash');
var Collection = require(path.join(__dirname, '../../lib', 'collection'));

module.exports = {
  '/': {
    get: function(req, res, next) {
      // Return response
      res.send(200, {response: 'OK'});

      return next();
    },
    post: function(req, res, next) {
      // Instantiate the payload as a new Collection.
      var shows = new Collection(req.body.payload);

      // Find DRM shows with episode count > 0 and return the image, slug and title properties only.
      var filteredShows = shows.find({drm: true, episodeCount: {$gt: 0}}, {image: 1, slug: 1, title: 1});

      // Map the image to the response object.
      var mapFilteredShows = _.map(filteredShows, function(show) {
        show.image = show.image.showImage;
        return show;
      });

      // Return response
      res.send(200, {response: mapFilteredShows});

      return next();
    }
  }
};
