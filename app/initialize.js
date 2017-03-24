import $     from "jquery";

$(document).ready(() => {
  $('.school-info__text span').on('click', function() {
    $(this).remove()
    $('.school-info__hidden').toggleClass('school-info__hidden--active')
  })

  $('a[href^="#"]').on('click', function() {
    let el = $(this).attr('href');
    $('body').animate({scrollTop: $(el).offset().top}, 500);
  });
});
