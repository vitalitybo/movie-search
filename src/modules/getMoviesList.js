export default async function getMoviesList(movieName, page = 1) {
  const OMDBAPIKey = 'apikey=68547faa';
  const urlBase = `http://www.omdbapi.com/?${OMDBAPIKey}&`;

  const searchList = `${urlBase}s=${movieName}&page=${page}`;

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
}
