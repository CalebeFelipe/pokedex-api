//Buscar o pokemon
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//Gera um novo array dos pokemons
const generatePokemonPromise = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types, sprites}) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const imageSrc = sprites.other.dream_world.front_default

    accumulator += `
        <li class="card">
            <a href="https://pokemondb.net/pokedex/${name}">
                <span class="card-id">${id}</span>
                <img class="card-image" src="https://img.pokemondb.net/sprites/bank/normal/${name}.png" alt="${name}">
                <div class="abilities">
                    <span class="types ${elementTypes[0]}">${elementTypes[0]}</span>
                    ${elementTypes[1] === undefined ? '' : `<span class="types ${elementTypes[1]}">${elementTypes[1]}</span>`}
                </div>
                <h5 class="card-title">${name}</h5>
            </a>
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
