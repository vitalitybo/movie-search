import Swiper from 'swiper';


const swiper = new Swiper('.swiper-container', {
  init: true,
  updateOnImagesReady: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    655: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    1350: {
      slidesPerView: 4,
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
});

export default swiper;
