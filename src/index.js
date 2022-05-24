import './css/styles.css';
import notiflixLibrary from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('input#search-box');

inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(e) {
  // e.currentTarget.value;
  console.log(e.target.value);
}

//  const markup = `<li>${name.official}
// <h2>${capital}</h2>
// <p>${population}</p>
// <img>${flags.svg}</img>
// <p>${languages}</p>

// </li>  `;

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
