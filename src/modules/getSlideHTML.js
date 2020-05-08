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

export default slideString;
