
var j = $;

j(function(){
  var log = new Log
    , view = new LogView(j('#items'))
    , page = 1;

  j('#prev').click(function(){
    --page;
    show();
  });
  
  j('#next').click(function(){
    ++page;
    show();
  });

  function show() {
    view.clear();
    log.page(page, function(err, items){
      items.map(function(item){
        view.add(item);
      });
    });
  }

  show();
});

