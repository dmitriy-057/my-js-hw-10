
export function fetchCountries(name) {
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages/`)
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
    .catch(error => {
        console.log(error)
    });
}