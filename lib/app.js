
/*!
 * cluster-log - app
 * Copyright(c) 2011 TJ Holowaychuk <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , stylus = require('stylus');

module.exports = function(app){
  // config
  app.set('title', 'Cluster Logs');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  // middleware
  app.use(stylus.middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));

  app.get('/', function(req, res){
    res.render('logs');
  });
};