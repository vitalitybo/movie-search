import Swiper from 'swiper';


const swiper = new Swiper('.swiper-container', {
  init: true,
  slidesPerView: 'auto',
  updateOnImagesReady: true,
  breakpoints: {
    320: {
      centeredSlides: true,
      spaceBetween: 300,
    },
    605: {
      centeredSlides: false,
      spaceBetween: 5,
    },
    1610: {
      spaceBetween: 30,
    },
  },
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  lazy: {
    loadPrevNext: true,
    // loadOnTransitionStart: true,
    loadPrevNextAmount: 1,
  },
  centerInsufficientSlides: true,
  watchSlidesVisibility: true,
  grabCursor: true,
});

export default swiper;
