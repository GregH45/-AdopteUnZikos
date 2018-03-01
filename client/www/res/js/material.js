'use strict';

(function () {

  function itemToCalibrateSelected(id, $item) {
    $item.addClass('validate');
  }

  $(document).ready(function () {
    App.userLoaded(function () {
      if (!App.User.name) {
        window.location = 'index.html';
      }

      if (App.User.star) {
        $('#material_star').addClass('active');
      } else {
        //$('#material_viewer').addClass('active');
        window.location = 'room.html';
      }
    });

    /**
     *  Calibration
    **/
    $('#material .collection-item').on('click', function (e) {
      var $this = $(e.currentTarget),
          itemId = $this.attr('d-item');

      itemToCalibrateSelected(itemId, $this);
    });

    /**
     *  Page Suivante
    **/
    $('#material .btn').on('click', function (e) {
      e.preventDefault();
      window.location = 'room.html';
    });
  });
})();