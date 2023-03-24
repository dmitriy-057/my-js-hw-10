const URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
   return fetch(`${URL}/name/${name}?fields=name,capital,population,flags,languages/`)
    .then(response => {
        if(!response.ok) {
            throw new Error()
        }
        return response.json();
    })
    .then(data => {
        console.log('data', data);
        return data;
    })
}