$(function(){

    $('.site').on('click', function(e) {
      $(this).css('color', 'red');
      // alert(2);
    });

  $('form').on('submit', function(e) {
    // e.preventDefault();
    var data = {
      site1: $('#word').val(),
      site2: $('#trans').val(),
      pile: $('#pile').val()
    };
    
    
    $.ajax({
      type: "POST",
      url: "/card-create",
      data: data,
      success: function(data) {
        location.reload();
      }
    });
    return false;
  });
});