$(document).ready(function() {
  $(document).click(function(e) {
    $("#coords").html(e.pageX + ', ' + e.pageY);
  });
  
  var e;
  e = new jQuery.Event("click");
  e.pageX = 10;
  e.pageY = 10;
  $(document).trigger(e);
});
