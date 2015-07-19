var _ = require('lodash');
var Q = require('q');

module.exports = function (gulp, plugins) {
  return function () {

    var config = require(__dirname + '/../config/env/development.json');

    if( _.includes(process.argv, '--production') ) {
      config = require(__dirname + '/../config/env/production.json');
    }

    if(process.argv[2] === 'test') {
      config = require(__dirname + '/../config/env/test.json');
    }

    var deferred = Q.defer();

    plugins.nodemon({
      script: __dirname + '/../server.js',
      env: config.env
    }).on('start', function() {
      deferred.resolve();
    }).on('restart', function () {
      console.log('Server restarted!')
    });

    return deferred.promise;
  };
};
