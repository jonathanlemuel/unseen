var Unseen = function(){

  var currentPage = 1,
      totalPages = 7,
      timer = null,
      interval = 20000,
      busy = false;

  function init(){
    key("left", previous);
    key("right", next);

    automate();
  }

  function automate(){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(next, interval);
  }

  function previous(){
    if(currentPage > 1){
      currentPage--;
    }
    else{
      currentPage = totalPages;
    }

    go(currentPage);
  }

  function next(){
    if(currentPage < totalPages){
      currentPage++;
    }
    else{
      currentPage = 1;
    }

    go(currentPage);
  }

  function go(page){
    if(busy || (page < 1) || (page > totalPages)){
      return;
    }

    if(timer){
      clearTimeout(timer);
    }

    busy = true;
    currentPage = page;

    $("#front").scrollTo("#f" + currentPage, 1000);
    $("#back").scrollTo("#b" + currentPage, 1000, {onAfter: function(){
      busy = false;
      if(currentPage != totalPages){
        automate();
      }
    }});
  }

  return {
    init: init,
    next: next,
    go: go
  }

}();

$(document).ready(function(){

  $("#spotlight").css({"background-color": "transparent"});

  var eventDate = new Date(2016, 9 - 1, 19);
  $("#time").countdown({until: eventDate, layout: "{dnnn} {hnn}:{mnn}:{snn}"});

  $("body").mousemove(function(event){
    var x = event.pageX - 1000;
    var y = event.pageY - 600;
    $("#spotlight").css({backgroundPosition: x + "px " + y + "px"});
  });

  var bgNumber = Math.floor(Math.random() * 4) + 1;
  $("#b7").css({"background-image": "url(img/bg-" + bgNumber + ".jpg)"});

  Unseen.init();

  $("#more").click(function(event){
    event.preventDefault();
    Unseen.go(7);
    return false;
  });

  $("#front").click(function(event){
    el = $(event.target);

    if(el.is("a") || el.is("a > span") || el.is("a > sub")){
      return true;
    }
    else{
      event.preventDefault();
      Unseen.next();
    }
  });
});