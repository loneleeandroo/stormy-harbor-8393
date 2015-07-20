# stormy-harbor-8393
A simple API server built using [restify](https://www.npmjs.com/package/restify). 

### Getting Started
Clone the repository to your local machine and start the server. By default, you should be able to access it at <code>http://localhost:3000</code>
```
git clone git@github.com:loneleeandroo/stormy-harbor-8393.git
cd stormy-harbor-8393
npm update // Or sudo npm update if you're having permission problems
gulp serve // You can kill the process using Ctrl+C
```

### Deployment
The deployment is done using heroku. To deploy simple do:
```
git push heroku master
```

### Testing
If you want to run the server with testing you can use:
```
gulp test
```
The test server will be running at <code>http://localhost:5000</code>

All tests are located in the <code>./test</code> directory. All tests are done using [Mocha](http://mochajs.org/), [should.js](https://shouldjs.github.io/) and [supertest](https://github.com/visionmedia/supertest).

### Configurations
All configurations are located at <code>./configs</code>.

### Routes
If you want to add a new API route, you will need to add a new folder and file in <code>./routes</code>. 
For example, if I wanted a new route at <code>/hello</code>, then the folder structure will now look like this:

```
/routes
  /base
    base.js
  /hello
    hello.js
```

and the <code>hello.js</code> file should look something like this:

```
module.exports = {
  '/hello': {
    get: function(req, res, next) {
      res.send(200, {response: 'Hello'});
      return next();
    }
  }
}
```

### Other
#### New gulp task
To add a new gulp task, create a new file in <code>gulp</code>. For example, <code>myTask.js</code>:
```
// Contents of myTask.js
module.exports = function (gulp, plugins) {
  return function () {
    // Do your task here
  };
};
```

and add the task the to gulpfile.js:
```
gulp.task('myTaskCommand', getTask('myTask'));
```
and you can run the task using:
```
gulp myTaskCommand
```


#### Collections
This is custom class to help filter arrays using mongodb-like queries. For example,:
```
var Collection = require(path/to/lib/collection);

/*
 * Converts an Array into a Collection
 *
 * @param data | Array | Instantiated data for the collection
 */
var users = new Collection([
  {user: 'bob', age: 20, status: 'married'}, // User 1
  {user: 'bob', age 30, status: 'single'} // User 2
]);

/*
 * The find method filters the collection data using mongodb-like query selectors.
 * See http://www.siftjs.com for a list of supported operators.
 *
 * @param selectors | Object | Query object to filter the data on.
 * @param fields | Object | Object to specify fields to return.
 */
users.find(
  {user: 'bob', age: {$gt: 20}}, // Selectors
  {user: 1, status: 1} // Fields
); 

// returns [{user: 'bob', status: 'single'}]
```
