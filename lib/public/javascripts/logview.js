

/*!
 * cluster-log - LogView
 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize `LogView` with the given `table` element.
 *
 * @param {jQuery} table
 * @return {Type}
 * @api public
 */

function LogView(table) {
  this.table = table;
  this.tbody = this.table.find('tbody');
}

/**
 * Add `item`.
 *
 * @param {Object} item
 * @api public
 */

LogView.prototype.add = function(item){
  var data = '';

  switch (item.type) {
    case 'exception':
      data += item.stack;
      break;
  }

  var el = j('<tr class="' + item.type + '"><td>'
    + item.worker + '</td><td>'
    + item.type + '</td><td><pre>'
    + data + '</pre></td></tr>');

  this.tbody.append(el);
};

/**
 * Remove rows.
 *
 * @api public
 */

LogView.prototype.clear = function(){
  this.tbody.find('tr').remove();
};
