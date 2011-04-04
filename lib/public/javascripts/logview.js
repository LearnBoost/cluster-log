

/*!
 * cluster-log - LogView
 * Copyright (c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

function LogView(table) {
  this.table = table;
  this.tbody = this.table.find('tbody');
}

LogView.prototype.add = function(item){
  var data = '';

  switch (item.type) {
    case 'exception':
      data += item.stack;
      break;
  }

  var el = j('<tr><td>'
    + item.worker + '</td><td>'
    + item.type + '</td><td>'
    + data + '</td></tr>');

  this.tbody.append(el);
};
