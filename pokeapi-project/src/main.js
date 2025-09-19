

/**
 * Get a pokemon by id. Using fetch and promises
 * 
 * @param {number} id - The id of the pokemon
 * @returns {Promise<Object>} - The pokemon data
 */
function getPokemonPromise(id) {
    // fetch returns a promise
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        // response.json() returns a promise
        .then(response => response.json())
        // data is the pokemon data
        .then(data => data)
        .catch(error => {
            console.error('Error al obtener el Pokémon:', error.message);
            return null;
        });
}


/**
 * Get a pokemon by id. Using fetch and async/await
 * 
 * @param {number} id - The id of the pokemon
 * @returns {Promise<Object>} - The pokemon data
 */
async function getPokemonAwait(id) {
    try {
        // fetch returns a promise
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // response.json() returns a promise
        return response.json();
    } catch (error) {
        console.error('Error al obtener el Pokémon:', error.message);
        return null;
    }
}

/**
 * Main function
 * 
 * @returns {Promise<void>}
 */
async function main() {
    // const pokemon = await getPokemonAwait(1);
    const pokemon = await getPokemonPromise(1);
    if (pokemon) {
        console.log(`Nombre: ${pokemon.name}`);
        console.log(`Altura: ${pokemon.height}`);
        console.log(`Peso: ${pokemon.weight}`);
        console.log('Tipos: ', pokemon.types.map(t => t.type.name).join(', '));
    }
}

main();