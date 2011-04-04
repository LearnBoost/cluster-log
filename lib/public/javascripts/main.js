
var j = $;

j(function(){
  var log = new Log({ perPage: 3 })
    , table = j('#items')
    , view = new LogView(table)
    , page = 1;

  j('#prev').click(function(){
    --page;
    show();
  });
  
  j('#next').click(function(){
    ++page;
    show();
  });

  // show the page
  function show() {
    if (page < 1) return;
    j('.page').text(' ' + page);
    window.location.hash = page;
    view.clear();
    log.page(page, function(err, items){
      items.map(function(item){ view.add(item); });
    });
  }

  // prev / next on left / right
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

  // page from fragment
  var hash = window.location.hash;
  if (hash && hash != page) {
    page = parseInt(hash.substr(1), 10);
    if (isNaN(page)) page = 1;
  }

  show();
});

