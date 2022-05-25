function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

export { fetchCountries };
