export default async function getMoviesList(movieName, page = 1) {
  const OMDBAPIKey = 'apikey=68547faa';
  const urlBase = `http://www.omdbapi.com/?${OMDBAPIKey}&`;

  const searchList = `${urlBase}s=${movieName}&page=${page}`;
  // const errorTextContainer = document.querySelector('.load-status__text');
  // errorTextContainer.innerHTML = '';

  // const cssLoader = document.querySelector('.load-status_loader');
  // cssLoader.hidden = false;

  // const moviesPerPage = 10;

  return fetch(searchList)
    .then((res) => {
      if (res.status >= 400 && res.status <= 599) {
        throw new Error(`${res.status}:${res.statusText}`);
      }
      return res;
    })
    .then((res) => {
      return res.json();
    }, (err) => {
      err.Response = 'False';
      err.Error = err.message;
      return err;
    })
    .then((movieObj) => movieObj);
  // .catch((err) => alert(err.message));
  // async function loadNextPageHandler() {
  //   if (swiper.slides.length === 0) swiper.off('reachEnd', loadNextPageHandler);.
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
