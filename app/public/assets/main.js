$(function () {

  $('.site').on('click', function (e) {
    $(this).css('color', 'red');
    // alert(2);
  });

  /**
   *  create-collection on the HOME page
   *  
   */
  $('#create-collection').on('submit', function (e) {
    var data = {
      collectionName: $('#collection').val()
    };

    $.ajax({
      type: "POST",
      url: "/",
      data: data,
      success: function (data) {
        location.reload();
      }
    });
    return false;
  });

  /**
   *  crate single question and answer to it on the collection page
   */
  $('#create-word').on('submit', function (e) {
    var data = {
      site1: $('#word').val(),
      site2: $('#trans').val(),
      pile: 1
    };
    var path = window.location.pathname;

    $.ajax({
      type: "PUT",
      url: path,
      data: data,
      success: function (data) {
        location.reload(false);
      }
    });
    return false;
  });
  // end of create-word

  /**
   *  updeate collection name on the home page
   */
  var form = $('.update-collection').each(function () {
    console.log($(this).children('.new-name'));

    $(this).on('submit', function (e) {


      if ($(this).children('.new-name').is('.new-name')) {

        $(this).children('.rename').html('<img src="/assets/img/update-icon.png" alt="update collection">');
        var newName = $(this).children('.new-name').val();

        var data = {
          id: $(this).attr("id"),
          newName: newName
        };
        $.ajax({
          type: "PUT",
          url: "/",
          data: data,
          success: function (data) {
            location.reload();
          }
        });
        return false;
      } else {
        e.preventDefault();
        /**
         *  инпут вместо ссылки (инпут имеет высоту и ширину ссылки)
         */
        $(this).children('.rename').html('<img src="/assets/img/confirm-icon.png" alt="confirm changes">');
        var value = $(this).siblings('a').html();
        var aWidth = $(this).siblings('a').innerWidth();
        var aHeight = $(this).siblings('a').innerHeight();
        var input = $('<input type="text"  class="new-name" value="' + value + '" required selected oninvalid="this.setCustomValidity(\'You have to fill this field!\')" oninput="this.setCustomValidity(\'\')" >').insertBefore($(this).children('.rename')).select();
        $(input).css({
          'max-width': aWidth,
          'max-height': aHeight
        });

        $(this).siblings('a').addClass('hide').hide();
        $('.hide').not($(this).siblings('a')).show().removeClass('hide');
      }

      $('.new-name').not($(this).children('.new-name')).siblings('.rename').html('<img src="/assets/img/update-icon.png" alt="update collection">');
      $('.new-name').not($(this).children('.new-name')).remove();
    });

  }); // end of the collection updating

  /**
   *  delete colltection on the home page
   */
  var deleteButton = $('.delete').each(function () {
    $(this).on('click', function () {
      var data = {
        id: $(this).attr("data-delete-id")
      };
      console.log(data);
      $.ajax({
        type: "DELETE",
        url: "/",
        data: data,
        success: function (data) {
          location.reload(false);
        }
      });
      return false;
    });
  });
}); // end of the collection delete