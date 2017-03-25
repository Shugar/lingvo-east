import $     from "jquery";

function onMenuClick (item) {
  $(item).on('click', function (e) {
    e.stopPropagation()

    $('.header-menu--mobile')
      .css('display', 'none')
      .show()
      .removeClass('header-menu--active')
      .delay(300)
      .fadeOut(0)
  })
}

$(document).ready(() => {
  $('.school-info__text span').on('click', function () {
    $(this).remove()
    $('.school-info__hidden').toggleClass('school-info__hidden--active')
  })

  $('a[href^="#"]').on('click', function () {
    let el = $(this).attr('href')
    $('body').animate({scrollTop: $(el).offset().top}, 500)
  })

  $('.learning-item').on('click', function () {
    $(this).toggleClass('learning-item--active')
    $(this).find('.learning-item__text').slideToggle()
  })

  $('.header-burger').on('click', function () {
    $('.header-menu--mobile')
      .css('display', 'flex')
      .hide()
      .fadeIn(0)
      .addClass('header-menu--active')
  })

  onMenuClick('.header-menu__cross')
  onMenuClick('.header-menu__item')
});
