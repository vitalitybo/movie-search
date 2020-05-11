import './styles/styles.scss';
import 'normalize.css';
import '../node_modules/swiper/css/swiper.css';
import findMovie from './modules/findMovie';


document.forms[0].onsubmit = findMovie;

document.querySelector('.search-bar__clear-input-button')
  .addEventListener('click', () => {
    document.forms[0].elements.searchInput.value = '';
  });
