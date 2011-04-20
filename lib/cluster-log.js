
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
 *   - `user`  basic-auth username
 *   - `pass`  basic-auth password
 *   - `tls`  TLS options, creating an HTTPS server
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

  log.enableInWorker = true;

  function log(master){
    if (master.isWorker) {
      master.log = function(type, data){
        if (type instanceof Error) data = type, type = 'exception';
        if (data instanceof Error) data = data.stack || data.message;
        master.call('logEvent', type, data);
      };
      return;
    }

    var db = redis.createClient();

    // worker logs
    master.logEvent = function(worker, type, data){
      push(type, data);
    };

    // push a log item

    function push(type, msg) {
      try {
        var obj = { date: Date.now(), type: type, message: msg };
        db.lpush('items', JSON.stringify(obj));
        db.ltrim('items', 0, max - 1);
      } catch (err) {
        // ignore
      }
    }

    // log events

    master.on('worker exception', function(worker, err){
      push('exception', err.stack || err.message);
    });

    master.on('restarting', function(){
      if (app.fd) app.close();
      push('restarting', 'a restart has been initiated');
    });

    master.on('worker removed', function(){
      push('worker removed', 'a worker was removed');
    });

    master.on('restart', function(){
      push('restart', 'restart complete');
    });

    master.on('closing', function(){
      if (app.fd) app.close();
    });

    // application

    var app = options.tls
      ? express.createServer(options.tls)
      : express.createServer();
  
    require('./app')(app, db, options.user, options.pass);
    if (options.title) app.set('title', options.title);
    app.listen(port, host);
  }

  return log;
};