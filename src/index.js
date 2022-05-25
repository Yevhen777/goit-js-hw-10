import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');

inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(e) {
  if (inputCountry.value.trim() === '') {
    inputCountry.innerHTML = '';
    countryList.innerHTML = '';
  } else {
    fetchCountries(inputCountry.value.trim())
      .then(responseEl => {
        if (responseEl.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
          creatingMarkup(responseEl);
        }
      })
      .catch(arror => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }

  function creatingMarkup(responseEl) {
    if (responseEl.length >= 2 && responseEl.length <= 10) {
      console.log('Флаг и имя страны');
    } else if (responseEl.length === 1) {
      console.log('флаг, название, столица, население и языки');
      const markup = responseEl.reduce(
        (acc, result) =>
          acc +
          `<li>${result.name.official}
  <p><b>Capital:</b> ${result.capital}</p>
  <p>${result.population}</p>
  <img src="${result.flags.svg}" alt="${result.name.official}" width="20" height="auto"></img>
  <p>${Object.values(result.languages)}</p>
  

  </li>`,
        '',
      );
      countryList.insertAdjacentHTML('beforeend', markup);
    }
  }
}

// function inputHandler(e) {
//   const inputEl = e.target.value;

//   } else if (!res.ok) {
//     Notiflix.Notify.failure('Oops, there is no country with that name');
//   }
