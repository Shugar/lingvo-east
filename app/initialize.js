import $     from "jquery";

$(document).ready(() => {
  $('.school-info__text span').on('click', function() {
    $(this).remove()
    $('.school-info__hidden').toggleClass('school-info__hidden--active')
  })
});
