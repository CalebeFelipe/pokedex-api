const urlPokeApi = 'https://pokeapi.co/api/v2/pokemon'
let paramsSearch = new URLSearchParams(window.location.search)
const namePokemon = paramsSearch.get('nome')

const criarCard = data => {
    const elementTypes = data.types.map(item => item.type.name)

        const cardInfo = `
        <li class="card">
            <a href="https://pokemondb.net/pokedex/${data.name}">
                <span class="card-id">${data.id}</span>
                <img class="card-image" src="https://img.pokemondb.net/sprites/black-white/normal/${data.name}.png" alt="${data.name}">
                <div class="abilities">
                    <span class="types ${elementTypes[0]}">${elementTypes[0]}</span>
                    ${elementTypes[1] === undefined ? '' : `<span class="types ${elementTypes[1]}">${elementTypes[1]}</span>`}
                </div>
                <h5 class="card-title">${data.name}</h5>
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