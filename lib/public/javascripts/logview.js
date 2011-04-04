

/*!
 * cluster-log - LogView
 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

function LogView(el) {
  this.el = el;
}

LogView.prototype.add = function(item){
  console.log(item);
};
