
/**
 * Module dependencies.
 */

var cluster = require('cluster')
  , log = require('./')
  , http = require('http');

var msgs = ['oh noes', 'boom', 'broken stuff'];

var server = http.createServer(function(req, res){
  // cluster will report uncaught exceptions
  if (Math.random() > 0.9) throw new Error(msgs[Math.random() * msgs.length | 0]);
  // we can also log arbitrary data
  if (req.url == '/login') cluster.log('login', 'tj logged in');
  // in many cases we would normally next(err)
  // so perhaps within an error handler we would
  // notify cluster of an exception, even if it 
  // did not crash the worker as an uncaughtException,
  // but is still useful for us.
  if (req.url == '/error') cluster.log(new Error('some error occurred'));
  res.end('Hello World');
});

cluster = cluster(server)
  .use(cluster.debug())
  .use(log({ max: 100 }))
  .listen(3000);

if (cluster.isMaster) {
  console.log('  cluster listening on port 3000');
  console.log('  log listening on port 9999');
}