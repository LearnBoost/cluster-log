
/*!
 * cluster-log - Log
 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize a new `Log`.
 *
 * @api public
 */

function Log() {

}

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
