import translate from './yandexTranslate';
import searchAndRenderSlides from './searchAndRenderSlides';
// import prepareSlidesData from './prepareSlidesData';
// import getMoviesList from './getMoviesList';
// import renderSlides from './renderSlides';

export default async function findMovie(event) {
  event.preventDefault();
  const translatedTitle = document.querySelector('.load-status__translated-title');
  translatedTitle.innerHTML = '';

  const { searchInput } = document.forms[0].elements;
  let requestedTitle = searchInput.value;
  if (requestedTitle.match(/[0-9а-яА-Я-]+/)) {
    requestedTitle = await translate(requestedTitle);

    translatedTitle.innerHTML = `Showing results for «${requestedTitle}»`;
  }

  searchAndRenderSlides(requestedTitle);
  // const moviesList = await getMoviesList(requestedTitle);
  // const slidesArray = await prepareSlidesData(moviesList);
  // renderSlides(slidesArray, true, moviesList, requestedTitle);
}
