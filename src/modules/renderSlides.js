import swiper from './swiper';
// import prepareSlidesData from './prepareSlidesData';
// import getMoviesList from './getMoviesList';

export default function renderSlides(slidesArray) {
  // const moviesPerPage = 10;
  // let page = 1;

  // async function loadNextPageHandler() {
  //   const reachEnd = ((page + 1) * moviesPerPage) >= movieObj.totalResults;

  //   if (movieObj.Search.length < moviesPerPage || reachEnd) {
  //     swiper.off('reachEnd', loadNextPageHandler);
  //   }

  //   const movsArray = await getMoviesList(movieName, page += 1);
  //   const slidsArray = await prepareSlidesData(movsArray);
  //   renderSlides(slidsArray, false, movieObj, movieName);
  // }

  // if (newRequest) {
  //   swiper.off('reachEnd');
  //   swiper.removeAllSlides();
  //   swiper.slideTo(0);
  //   swiper.on('reachEnd', loadNextPageHandler);
  // }

  swiper.appendSlide(slidesArray);
  const cssLoader = document.querySelector('.load-status_loader');
  cssLoader.hidden = true;
  swiper.lazy.load();
}
