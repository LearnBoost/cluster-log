
/**
 * Module dependencies.
 */

var cluster-log = require('cluster-log')
  , should = require('should');

module.exports = {
  'test .version': function(){
    cluster-log.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};