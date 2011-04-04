
/*!
 * cluster-log
 * Copyright(c) 2011 TJ Holowaychuk <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var redis = require('redis')
  , express = require('express');

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
 * By default the `port` is `9999`.
 *
 * Options:
 *
 *   - `max`  maximum number of entries [2000]
 *   - `title`  page title ["Cluster Logs"]
 *
 * @param {Object} options
 * @param {Number|String} port
 * @param {String} host
 * @return {Function}
 * @api public
 */

function log(options, port, host) {
  var options = options || {}
    , max = options.max || 2000
    , port = undefined === port
      ? 9999
      : port;

  return function(master){
    var db = redis.createClient();

    function push(type, msg) {
      try {
        var obj = { type: type, message: msg };
        db.lpush('items', JSON.stringify(obj));
        db.ltrim('items', 0, max - 1);
      } catch (err) {
        // ignore
      }
    }

    // log exceptions
    master.on('worker exception', function(worker, err){
      push('exception', err.stack || err.message);
    });

    // application
    var app = express.createServer();
    require('./app')(app, db);
    if (options.title) app.set('title', options.title);
    app.listen(port, host);
  }
};