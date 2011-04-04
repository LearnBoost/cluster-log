
var j = $;

j(function(){
  var log = new Log({ perPage: 3 })
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

  j(document).keydown(function(event){
    switch (event.keyCode) {
      // right
      case 39:
        $('#next').click().addClass('active');
        setTimeout(function(){
          $('#next').removeClass('active');
        }, 100);
        break;
      // left
      case 37:
        $('#prev').click().addClass('active');
        setTimeout(function(){
          $('#prev').removeClass('active');
        }, 100);
        break;
    }
  });

  show();
});

