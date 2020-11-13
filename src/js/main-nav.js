// Header

const navMain = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");
const pageHeader = document.querySelector(".page-header");

pageHeader.classList.remove("page-header__nojs");
navMain.classList.remove("main-nav__nojs");

navToggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.remove("main-nav--closed-after");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.add("main-nav--closed-after");
    navMain.classList.remove("main-nav--opened");
  }
});


$(function() {
  $('.form__phone-input--mask').mask('+7 (000) 000-00-00');
});