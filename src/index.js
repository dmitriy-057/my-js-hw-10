import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    listCountries: document.querySelector(".country-list"),
    countryContainer: document.querySelector("country-info")
}

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry() {
    const country = refs.input.value;
    console.log('country', country);

    if(country === "") {
        return;
    };
    fetchCountries(country)
    .then(createCountriesList)
  
    
}

function createCountriesList(countries) {
    const markup = countries
    .map(({ name, flags }) => {
      return `
      <li> 
        <img src = ${flags.svg} 
            alt = "${name}" 
            width = 100>
        <span>${name.official}</span>
      </li>`;
    })
    .join('');
  refs.listCountries.insertAdjacentHTML('beforeend',markup); 
}