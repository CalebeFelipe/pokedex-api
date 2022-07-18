const urlPokeApi = 'https://pokeapi.co/api/v2/pokemon'
let paramsSearch = new URLSearchParams(window.location.search)
const namePokemon = paramsSearch.get('nome')

const criarCard = pokemon => {
    const elementTypes = pokemon.types.map(item => item.type.name)
        const cardInfo = `
        <li class="card info">
            <a href="https://pokemondb.net/pokedex/${pokemon.name}">
                <span class="card-id">${pokemon.id}</span>
                <img class="card-image" src="https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png" alt="${pokemon.name}">
                <div class="abilities">
                    <span class="types ${elementTypes[0]}">${elementTypes[0]}</span>
                    ${elementTypes[1] === undefined ? '' : `<span class="types ${elementTypes[1]}">${elementTypes[1]}</span>`}
                </div>
                <h5 class="card-title">${pokemon.name}</h5>
                <h5 class="card-title">weight: ${pokemon.weight}kg</h5>
                <h5 class="card-title">height: 0.${pokemon.height}m</h5>
            </a>
        </li>`

    return cardInfo
}

const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons 
}

fetch(`${urlPokeApi}/${namePokemon}`)
    .then(response => response.json())
    .then(criarCard)
    .then(insertPokemonIntoPage)