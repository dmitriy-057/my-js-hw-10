import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    listCountries: document.querySelector(".country-list"),
    countryContainer: document.querySelector("country-info"),
}

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry() {
    const country = refs.input.value.trim();
    console.log('country', country);

    fetchCountries(country)
    .then(createCountriesMarkup)
    .catch(Notify.failure("Страны с таким названием не существует"));
}

function createCountriesMarkup(countries) {

    if(countries.length > 10) {
        refs.listCountries.innerHTML = " ";
        refs.countryContainer.innerHTML = " ";
        Notify.info("Найдено много стран. Введите более специфическое название");
    };

    if(countries.length >= 2 && countries.length < 10) {
        const markupList = countries
        .map(({ name, flags }) => {
          return `
          <li> 
            <img src = ${flags.svg} 
                alt = "${name}" 
                width = 100>
            <span>${name.official}</span>
          </li>`;
        }).join('');
        refs.listCountries.innerHTML = markupList;
        refs.countryContainer.innerHTML = " ";
    };

    if(countries.length === 1) {

        const markupCountry = countries.map(({flags, name,capital, population, languages}) => {
            return `
            <img src = ${flags.svg} 
            alt = "${name}" 
            width = 300> 
            <h2>${name.official}</h2>
            <p>${capital}</p>
            <p>${population}</p>
            <p>${languages}</p>
            `
        }).join('');
        refs.countryContainer.innerHTML = markupCountry;
        refs.listCountries.innerHTML = " ";    
    }

 
};



// function clearCountries() {
//     refs.listCountries.innerHTML = "";
// }