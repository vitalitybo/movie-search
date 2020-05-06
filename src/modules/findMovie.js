import swiper from './swiper';
import translate from './yandexTranslate';

export default async function findMovie(event) {
  event.preventDefault();

  const { searchInput } = document.forms[0].elements;
  let requestedTitle = searchInput.value;
  if (requestedTitle.match(/[0-9а-яА-Я- ]+/)) {
    requestedTitle = await translate(requestedTitle);
  }

  const apiKey = 'apikey=68547faa';
  const urlBase = `http://www.omdbapi.com/?${apiKey}&`;

  const slideString = (title, year, rating, posterURL) => {
    if (posterURL === 'N/A') posterURL = '/../assets/images/no-poster-available.jpg';

    return `
      <div class="card swiper-slide">
        <h2 class="card__title">${title}</h2>
        <div class="card__image">
          <img data-src="${posterURL}" alt="${title}" class="swiper-lazy">
          <div class="swiper-lazy-preloader">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        </div>
        <div class="card__year"><span>${year}</span></div>
        <div class="card__rating"><span>${rating}</span></div>
      </div>
      `;
  };
  //

  async function getMoviesData(moviesArray, removeSlides = true) {
    if (!moviesArray) return;
    // const array = moviesArray.slice(0, 4);
    const slidesArray = [];
    // await moviesArray.forEach(

    async function getData(movie) {
      const search = `${urlBase}i=${movie.imdbID}`;

      await fetch(search)
        .then((res) => res.json())
        .then((movieObj) => {
          slidesArray.push(slideString(movieObj.Title, movieObj.Year,
            movieObj.imdbRating, movieObj.Poster));
        });
      // });
    }
    const promises = moviesArray.map(getData);
    await Promise.all(promises)
      .then(() => {
        if (removeSlides) {
          swiper.removeAllSlides();
          swiper.slideTo(0);
        }
        swiper.appendSlide(slidesArray);
        const cssLoader = document.querySelector('.load-status_loader');
        cssLoader.hidden = true;
        swiper.lazy.load();
      });
  }

  async function getMoviesList(movieName, page = 1) {
    const searchList = `${urlBase}s=${movieName}&page=${page}`;
    const errorTextContainer = document.querySelector('.load-status__text');
    errorTextContainer.innerHTML = '';

    const cssLoader = document.querySelector('.load-status_loader');
    cssLoader.hidden = false;

    return fetch(searchList)
      .then((res) => res.json())
      .then((movieObj) => {
        async function loadNextPageHandler() {
          if (movieObj.Search.length < 10
            || ((page + 1) * 10) >= movieObj.totalResults) {
            swiper.off('reachEnd', loadNextPageHandler);
          }

          const moviesArray = await getMoviesList(movieName, page += 1);
          await getMoviesData(moviesArray, false);
        }

        if (movieObj.Response === 'False') {
          cssLoader.hidden = true;
          errorTextContainer.innerHTML = `Error: ${movieObj.Error}`;
          return undefined;
        }
        errorTextContainer.innerHTML = '';

        if (movieObj.Search.length === 10 && page === 1) {
          swiper.on('reachEnd', loadNextPageHandler);
        }

        return movieObj.Search;
      })
      .catch((err) => console.log(err));
  }

  const moviesList = await getMoviesList(requestedTitle);
  // searchInput.value = '';
  await getMoviesData(moviesList);
  // .then(() => {
  //   // swiper.appendSlide(...slidesArray);
  //   swiper.removeSlide([0, 1, 2, 3]);
  // });
}
