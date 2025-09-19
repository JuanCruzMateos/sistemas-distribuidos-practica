// console.log("Primero");
// setTimeout(() => {
//     console.log("Segundo");
// }, 2000);
// console.log("Tercero");


fetch('https://pokeapi.co/api/v2/pokemon/1')

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// let a = fetch('https://pokeapi.co/api/v2/pokemon/1')
//     .then(response => {
//         console.log(response.status);
//         return response.json();
//     })
// a.then(data => console.log(data.name)).catch(error => console.error(error));