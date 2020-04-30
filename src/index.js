import './styles/styles.scss';
import 'normalize.css';
import './extended-libs/slick/slick';
import './extended-libs/slick/slick.scss';
import './extended-libs/slick/slick-theme.scss';

jQuery(document).ready(() => {
  jQuery('.cards').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });
});
