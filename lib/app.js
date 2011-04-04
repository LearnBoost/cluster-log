
/*!
 * cluster-log - app
 * Copyright(c) 2011 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , stylus = require('stylus');

/**
 * Setup application.
 */

module.exports = function(app, db){

  // config
  app.set('title', 'Cluster Logs');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  // middleware
  app.use(stylus.middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));

  // routes
  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/items/:from/:to', function(req, res, err){
    var from = req.params.from
      , to = req.params.to;
    db.lrange('items', from, to, function(err, items){
      if (err) return res.send({ error: 'failed to fetch items' });
      try {
        res.send(items.map(JSON.parse));
      } catch (err) {
        res.send({ error: 'failed to parse json items' });
      }
    });
  });
};