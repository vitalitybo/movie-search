import swiper from './swiper';

export default function renderSlides(slidesArray) {
  swiper.appendSlide(slidesArray);
  const cssLoader = document.querySelector('.load-status_loader');
  cssLoader.hidden = true;
  swiper.lazy.load();
}
