import $ from "jquery"
import mask from 'jquery-inputmask'
import { default as swal } from 'sweetalert2'
import VMasker from 'vanilla-masker'

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

var smallScreen = false
if ($(window).width() < 768) {
  smallScreen = true
}

$(window).resize(function () {
  return $(window).width() < 768 ? smallScreen = true : smallScreen = false
})

function learningToggle () {
  $('.learning-item').on('click', function () {
    if (smallScreen === true) {
      $(this).toggleClass('learning-item--active')
      $(this).find('.learning-item__text').slideToggle()
    }
  })
}

function initAnchorScrolling () {
  $('a[href^="#"]').on('click', function () {
    let el = $(this).attr('href')
    $('body').animate({scrollTop: $(el).offset().top}, 500)
  })
}

function schoolInfoToggle () {
  $('.school-info__text span').on('click', function () {
    $(this).remove()
    $('.school-info__hidden').toggleClass('school-info__hidden--active')
  })
}

function initMobileMenu () {
  $('.header-burger').on('click', function () {
    $('.header-menu--mobile')
      .css('display', 'flex')
      .hide()
      .fadeIn(0)
      .addClass('header-menu--active')
  })
}

let email_validated   = false;
let phone_validated   = false;
let name_validated    = false;
let message_validated = false;

function initFormValidation () {
  function isEmail (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return regex.test(email)
  }

  let myPhoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
  $('#phone').on('input', function () {
    $('#phone').val(
      VMasker.toPattern($("#phone").val(), "+9 (999) 999-99-99")
    )

    if (myPhoneRegex.test($('#phone').val())) {
      $('#phone').removeClass('input-error')
      $('#phone').addClass('input-success')
      phone_validated = true
    } else {
      $('#phone').removeClass('input-success')
      $('#phone').addClass('input-error')
      phone_validated = false
    }
  })

  $('#message').on('input', function () {
    if ($('#message').val() !== '') {
      $('#message').removeClass('input-error')
      $('#message').addClass('input-success')
      message_validated = true
    } else {
      $('#message').removeClass('input-success')
      $('#message').addClass('input-error')
      message_validated = false
    }
  })

  $('#email').on('input', function () {
    let email = $('#email').val()
    if (isEmail(email)) {
      $('#email').removeClass('input-error')
      $('#email').addClass('input-success')
      email_validated = true
    } else {
      $('#email').removeClass('input-success')
      $('#email').addClass('input-error')
      email_validated = false
    }
  })

  $('#name').on('input', function() {
    if ($('#name').val() !== '') {
      $('#name').removeClass('input-error')
      $('#name').addClass('input-success')
      name_validated = true
    } else {
      $('#name').removeClass('input-success')
      $('#name').addClass('input-error')
      name_validated = false
    }
  })
}


function formSubmit () {
  const form = $('.footer-form')

  $(form).submit(function (event) {
    event.preventDefault()

    let formData = $(form).serialize();

    console.log(formData)

    if (phone_validated === true && message_validated === true && email_validated === true && name_validated === true) {
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
        .done(function (response) {
          swal({
            title: 'Отправлено!',
            text: 'Ожидайте ответа :)',
            type: 'success',
            timer: 2000
          })

          $('#name').val('').removeClass('input-success');
          $('#phone').val('').removeClass('input-success');
          $('#email').val('').removeClass('input-success');
          $('#message').val('').removeClass('input-success');
        })
        .fail(function (data) {
          swal({
            title: 'Ошибка!',
            text: 'Что-то пошло не так, попробуйте снова',
            type: 'error',
            timer: 2000
          })
        });
    } else {
      swal({
        title: 'Ошибка!',
        text: 'Пожалуйста, заполните правильно все поля',
        type: 'error'
      })
    }
  })
}

$(document).ready(() => {
  initAnchorScrolling()
  schoolInfoToggle()
  learningToggle()
  initMobileMenu()
  onMenuClick('.header-menu__cross')
  onMenuClick('.header-menu__item')
  initFormValidation()
  formSubmit()
})
