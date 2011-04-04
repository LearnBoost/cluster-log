
/**
 * Module dependencies.
 */

var cluster = require('cluster')
  , log = require('./')
  , http = require('http');

var server = http.createServer(function(req, res){
  if (Math.random() > 0.9) throw new Error('omgz!'); 
  res.end('Hello World');
});

cluster(server)
  .use(log())
  .listen(3000);

console.log('cluster listening on port 3000');