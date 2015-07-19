// Dependencies
var sift = require('sift');
var _ = require('lodash');

/*
 * The constructor for the Collection class.
 *
 * @param data | Array | Instantiated data for the collection
 */
var Collection = function(data) {
  this._data = data;
  return;
};

/*
 * Filters the collection data using mongodb-like query selectors.
 * See http://www.siftjs.com for a list of supported operators.
 *
 * @param selectors | Object | Query object to filter the data on.
 * @param fields | Object | Object to specify fields to return.
 */
Collection.prototype.find = function(selectors, fields) {

  if(!selectors) {
    return this._data;
  }

  var cursor = sift(selectors, this._data);

  return _.map(cursor, function(obj) {

    // if no fields are specified, return the original object.
    if(!fields) {
      return obj;
    }

    var invertedFields = _.invert(fields, true);

    if(invertedFields[1]) {

      // Return only the specified properties.
      return _.pick(obj, invertedFields[1]);

    } else if(invertedFields[0]) {

      // Exclude the specified properties.
      return _.omit(obj, invertedFields[0]);

    }

  });
};

module.exports = Collection;
