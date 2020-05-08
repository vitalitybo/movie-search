import slideString from './getSlideHTML';


export default async function prepareSlidesData(moviesObj) {
  if (!moviesObj) return;
  const moviesArray = moviesObj.Search;

  const OMDBAPIKey = 'apikey=68547faa';
  const urlBase = `http://www.omdbapi.com/?${OMDBAPIKey}&`;

  const slidesArray = [];

  async function getData(movie) {
    const search = `${urlBase}i=${movie.imdbID}`;

    await fetch(search)
      .then((res) => res.json())
      .then((movieObj) => {
        slidesArray.push(slideString(movieObj.Title, movieObj.Year,
          movieObj.imdbRating, movieObj.Poster));
      });
  }
  const promises = moviesArray.map(getData);

  return Promise.all(promises)
    .then(() => slidesArray);
}
