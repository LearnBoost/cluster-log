
/**
 * Module dependencies.
 */

var cluster = require('cluster')
  , http = require('http');

var server = http.createServer(function(req, res){
  res.end('Hello World');
});