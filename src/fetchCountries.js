// 1сделать http заппрос и эспортировать в index js
// function fetchCountries(name) {
//   fetch('https://restcountries.com/v3.1/name/peru')
//     .then(response => {
//       return response.json();
//     })
//     .then(country => {
//       console.log(country);
//     });
// }

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`,
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);
    })
    .catch(arror => console.log(arror));
}

export { fetchCountries };
