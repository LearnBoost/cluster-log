
var j = $;

j(function(){
  var log = new Log({ perPage: 12 })
    , table = j('#items')
    , view = new LogView(table)
    , page
    , total;

  j('#prev').click(function(){
    show(page - 1);
  });
  
  j('#next').click(function(){
    show(page + 1);
  });

  // show the page
  function show(n) {
    if (n < 1 || n > total) return;
    window.location.hash = page = n;
    view.clear();

    log.page(page, function(err, items){
      items.map(function(item){ view.add(item); });
    });

    log.length(function(err, len){
      total = Math.ceil(len / log.perPage);
      j('.page').text(' ' + page + ' / ' + total);
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

  show(1);
});

