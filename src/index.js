import './styles/styles.scss';
import 'normalize.css';
import { $, jQuery } from 'jquery';

window.$ = $;
window.jQuery = jQuery;

$(document).ready(() => {
  $('.cards').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  });
});
