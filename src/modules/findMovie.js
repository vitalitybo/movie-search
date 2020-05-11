import translate from './yandexTranslate';
import searchAndRenderSlides from './searchAndRenderSlides';


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
}
