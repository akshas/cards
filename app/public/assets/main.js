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

  var renameButton = $('.rename').each(function () {
    var editable = '.editable';
    var $a = $(this).siblings('a'),
      isEditable = $a.is(editable),
      nameByFocus;
    $(this).on('click', function () {

      $a.prop('contenteditable', !isEditable).toggleClass('editable').focus();
      nameByFocus = $a.html();
      $('a').not($a).prop('contenteditable', false).removeClass('editable');
      $('.rename').not(this).html('<img src="/assets/img/update-icon.png", alt="update collection">')

      if ($($a).is(editable)) {
        $(this).html('<img src="/assets/img/confirm-icon.png", alt="confirm collection">');
      } else {
        var data = {
          id: $(this).attr("data-rename-id"),
          newName: $($a).text()
        };
        $.ajax({
          type: "PUT",
          url: '/',
          data: data,
          success: function (data) {
            location.reload(false);
          }
        });
        return false;
      }

      $($a).on('blur', function () {

        if ($(this).html() != nameByFocus) {
          var data = {
            id: $(this).siblings('.rename').attr("data-rename-id"),
            newName: $(this).text()
          };
          $.ajax({
            type: "PUT",
            url: '/',
            data: data,
            success: function (data) {
              location.reload(false);
            }
          });
          return false;
        }
      });
    });
  });
}); // end of the collection delete

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
// end of the collection delete