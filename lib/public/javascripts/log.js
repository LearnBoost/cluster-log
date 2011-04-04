
/*!
 * cluster-log - Log
 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize a new `Log` with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

function Log(options) {
  options = options || {};
  this.perPage = options.perPage || 8;
}

/**
 * Get items for page `n` and callback `fn(err, items)`.
 *
 * @param {Number} n
 * @param {Function} fn
 * @api public
 */

Log.prototype.page = function(n, fn){
  var per = this.perPage
    , to = n * per
    , from = to - per;

  this.get(from, to, fn);
};

/**
 * Get log items with range `from` / `to`, calling `fn(err, items)`.
 *
 * @param {Number} from
 * @param {Number} to
 * @param {Function} fn
 * @api public
 */

Log.prototype.get = function(from, to, fn){
  $.get('/items/' + from + '/' + to, function(res){
    if (res.error) return fn(res.error);
    fn(null, res);
  });
};
