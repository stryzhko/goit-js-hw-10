const URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}?fields=${FIELDS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}