import prepareSlidesData from './prepareSlidesData';
import getMoviesList from './getMoviesList';
import renderSlides from './renderSlides';
import swiper from './swiper';


export default async function searchAndRenderSlides(requestedTitle, newRequest = true, page = 1) {
  const errorTextContainer = document.querySelector('.load-status__text');
  errorTextContainer.innerHTML = '';

  const cssLoader = document.querySelector('.load-status_loader');
  cssLoader.hidden = false;

  const moviesListObj = await getMoviesList(requestedTitle, page);

  if (moviesListObj.Response === 'False') {
    cssLoader.hidden = true;

    if (moviesListObj.Error === 'Movie not found!') {
      errorTextContainer.innerHTML = `No results for «${requestedTitle}»`;
    } else {
      errorTextContainer.innerHTML = `Error: ${moviesListObj.Error}`;
    }

    return undefined;
  }

  let currentPage = page;

  async function loadNextPageHandler() {
    const moviesPerPage = 10;
    const nextPage = currentPage + 1;

    const reachEnd = ((nextPage) * moviesPerPage) >= moviesListObj.totalResults;

    if (moviesListObj.Search.length < moviesPerPage || reachEnd) {
      swiper.off('reachEnd', loadNextPageHandler);
      return;
    }

    searchAndRenderSlides(requestedTitle, false, currentPage += 1);
  }

  if (newRequest) {
    swiper.off('reachEnd');
    swiper.removeAllSlides();
    swiper.slideTo(0);
    swiper.on('reachEnd', loadNextPageHandler);
  }

  const slidesArray = await prepareSlidesData(moviesListObj);
  renderSlides(slidesArray);
}
