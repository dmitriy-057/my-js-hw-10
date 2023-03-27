import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 500;

const refs = {
    input: document.querySelector("#search-box"),
    listCountries: document.querySelector(".country-list"),
    countryContainer: document.querySelector(".country-info"),
}

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry() {
    console.log('input value', refs.input.value)
    const country = refs.input.value.trim();

    clearMarkup();
    fetchCountries(country)
    .then(createCountriesMarkup)
    .catch(error => {
        Notify.failure("Страны с таким названием не существует");
        console.log(error);
    });

}


function createCountriesMarkup(countries) {
    
    if(countries.length > 10) {
        Notify.info("Найдено много совпадений. Введите более специфическое название")
    }

    if(countries.length >= 2 && countries.length <= 10) {
        const markupListCountries = countries.map(({name,flags}) => {
            return `
            <li class="country-list-item"> 
            <div>
            <img src = ${flags.svg} 
                alt = "${name}" 
                width=100
                height=80>
            <span class="country-span">${name.official}</span>
            </div>
          </li>
            `
        }).join("");

        refs.listCountries.innerHTML = markupListCountries;
        refs.countryContainer.innerHTML = "";
    }

    if(countries.length === 1) {
        const markupCountry = countries.map(({name,capital,population,flags,languages})=> {
            return `
            <div class="country-info-box">
            <div class="country-title-box">
            <img src = ${flags.svg} 
            alt = "${name}" 
            width = 80> 
            <h2 class="country-title">${name.official}</h2>
            </div>
            <p class="country-params"><b>Capital:</b> ${capital}</p>
            <p class="country-params"><b>Population:</b> ${population} people</p>
            <p class="country-params"><b>Languages:</b> 
            ${Object.values(languages).join(",")}
            </p>
            `
        }).join('');
        refs.listCountries.innerHTML = "";
        refs.countryContainer.innerHTML = markupCountry;
    }
}

function clearMarkup() {
    refs.listCountries.innerHTML = '';
    refs.countryContainer.innerHTML = '';
}


// function onSearchCountry() {
//     const country = refs.input.value.trim();
//     console.log('country', country);

//     clearMarkup();
//     fetchCountries(country)
//     .then(createCountriesMarkup)
//     .catch(error => {
//         Notify.failure("Страны с таким названием не существует");
//         console.log(error);
//     });
// }

// function createCountriesMarkup(countries) {

//     if(countries.length > 10) {
//        Notify.info("Найдено много совпадений. Введите более специфическое название");
//     };

//     if(countries.length >= 2 && countries.length < 10) {

//         const markupList = countries
//         .map(({ name, flags }) => {            
//           return `
//           <li class="country-list-item"> 
//             <div>
//             <img src = ${flags.svg} 
//                 alt = "${name}" 
//                 width=100
//                 height=80>
//             <span class="country-span">${name.official}</span>
//             </div>
//           </li>`;
//         }).join('');
//         refs.listCountries.innerHTML = markupList;
//         refs.countryContainer.innerHTML = '';
//     };

//     if(countries.length === 1) {

//         const markupCountry = countries.map(({flags, name,capital, population, languages}) => {
//             return `
//             <div class="country-info-box">
//             <div class="country-title-box">
//             <img src = ${flags.svg} 
//             alt = "${name}" 
//             width = 80> 
//             <h2 class="country-title">${name.official}</h2>
//             </div>
//             <p class="country-params"><b>Capital:</b> ${capital}</p>
//             <p class="country-params"><b>Population:</b> ${population}</p>
//             <p class="country-params"><b>Languages:</b> 
//             ${languages}
//             </p>
//             `
//         }).join('');
//         refs.countryContainer.innerHTML = markupCountry;
//         refs.listCountries.innerHTML = '';    
//     }

 
// };
