export default async function getMoviesList(movieName, page = 1) {
  const OMDBAPIKey = 'apikey=68547fa';
  const urlBase = `http://www.omdbapi.com/?${OMDBAPIKey}&`;

  const searchList = `${urlBase}s=${movieName}&page=${page}`;
  // const errorTextContainer = document.querySelector('.load-status__text');
  // errorTextContainer.innerHTML = '';

  // const cssLoader = document.querySelector('.load-status_loader');
  // cssLoader.hidden = false;

  // const moviesPerPage = 10;

  return fetch(searchList)
    .then((res) => res.json())
    .then((movieObj) => movieObj);
  // .catch((err) => alert(err.message));
  // async function loadNextPageHandler() {
  //   if (swiper.slides.length === 0) swiper.off('reachEnd', loadNextPageHandler);
  //   const reachEnd = ((page + 1) * moviesPerPage) >= movieObj.totalResults;

  //   if (movieObj.Search.length < moviesPerPage || reachEnd) {
  //     swiper.off('reachEnd', loadNextPageHandler);
  //   }

  //   const moviesArray = await getMoviesList(movieName, page += 1);
  //   const slidesArray = await prepareSlidesData(moviesArray);
  //   renderSlides(slidesArray, false);
  // }

  // if (movieObj.Response === 'False') {
  //   cssLoader.hidden = true;
  //   errorTextContainer.innerHTML = `Error: ${movieObj.Error}`;
  //   return movieObj;
  // }
  // errorTextContainer.innerHTML = '';

  // if (movieObj.Search.length === moviesPerPage && page === 1) {
  //   swiper.on('reachEnd', loadNextPageHandler);
  // }

  // return movieObj;
}
