
/*!
 * cluster-log
 * Copyright(c) 2011 TJ Holowaychuk <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis');

/**
 * Expose plugin.
 */

exports = module.exports = log;

/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * Initialize log plugin with the given `options`.
 *
 * Options:
 *
 *   - `max`  maximum number of entries [2000]
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

function log(options) {
  var options = options || {}
    , max = options.max || 2000;

  return function(master){
    var db = redis.createClient();

    master.on('worker exception', function(worker, err){
      try {
        err.worker = worker.id;
        db.lpush('exceptions', JSON.stringify(err));
        db.ltrim('exceptions', 0, max - 1);
      } catch (err) {
        // ignore
      }
    });
  }
};