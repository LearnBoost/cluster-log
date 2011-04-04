
var j = $;

j(function(){
  var log = new Log
    , view = new LogView;

  log.get(0, 20, function(err, items){
    items.map(function(item){
      view.add(item);
    });
  });
});