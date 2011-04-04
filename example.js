
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

cluster = cluster(server)
  .use(cluster.debug())
  .use(log({ max: 100, user: 'tj', pass: 'foobar' }))
  .listen(3000);

if (cluster.isMaster) {
  console.log('  cluster listening on port 3000');
  console.log('  log listening on port 9999');
}