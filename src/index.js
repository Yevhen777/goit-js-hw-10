import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(e) {
  if (inputCountry.value.trim() === '') {
    inputCountry.value = '';

    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    fetchCountries(inputCountry.value.trim())
      .then(responseEl => {
        if (responseEl.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
          creatingMarkup(responseEl);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');

        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      });
  }

  function creatingMarkup(responseEl) {
    countryList.classList.remove('big-text');
    countryInfo.innerHTML = '';

    if (responseEl.length >= 2 && responseEl.length <= 10) {
      let allCountries = responseEl
        .map(country => {
          return `<li><img src="${country.flags.svg}" width="20" height="auto" 
          style="margin-right:5px" alt="${country.name.common}">${country.name.common}</li>`;
        })
        .join('');
      countryList.innerHTML = allCountries;
      countryInfo.innerHTML = '';
    }

    if (responseEl.length === 1) {
      countryList.innerHTML = '';
      console.log('object2');
      countryList.classList.add('big-text');

      const markup = responseEl.reduce(
        (acc, result) =>
          acc +
          `<li class="info">
          <img src="${result.flags.svg}"  width="25" height="auto"></img>
          <span class="name-country">${result.name.common}</span>
  <p><b>Capital: </b> ${result.capital}</p>
  <p><b>Population: </b>${result.population}</p>
  
  <p><b>Languages: </b>${Object.values(result.languages)}</p>
  

  </li>`,
        '',
      );
      countryInfo.innerHTML = markup;
    }
  }
}


