//Buscar o pokemon
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//Gera um novo array dos pokemons
const generatePokemonPromise = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types, sprites}) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const imageSrc = sprites.other.dream_world.front_default

    accumulator += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="${imageSrc}" />
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>`

    return accumulator
}, '')


const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons 
}


const pokemonPromises = generatePokemonPromise()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage)
