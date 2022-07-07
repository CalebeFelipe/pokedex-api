//Buscar o pokemon
const urlPokeApi = 'https://pokeapi.co/api/v2/pokemon'
const getPokemonUrl = id => `${urlPokeApi}/${id}`
const searchType = document.getElementById('type')
const searchName = document.getElementById('name')

//Gera um novo array dos pokemons
const generatePokemonPromise = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()).then(data => data))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types, sprites}) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

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

console.log(pokemonPromises)

const filterType = () => {
    const type = searchType.value

    Promise.all(pokemonPromises)
    .then(pokemons => pokemons.filter(item => {
        const elementTypes = item.types.map(item => item.type.name)

        if (elementTypes[0] == type || elementTypes[1] == type) return true
    }))
    .then(generateHTML)
    .then(insertPokemonIntoPage)
}

const getPokemonInfo = () => {
    const namePokemon = searchName.value
    
    fetch(`${urlPokeApi}/${namePokemon}`)
        .then(response => response.json())
        .then(data => {
            const elementTypes = data.types.map(item => item.type.name)

            const cardInfo = `
            <li class="card">
                <a href="https://pokemondb.net/pokedex/${data.name}">
                    <span class="card-id">${data.id}</span>
                    <img class="card-image" src="https://img.pokemondb.net/sprites/bank/normal/${data.name}.png" alt="${data.name}">
                    <div class="abilities">
                        <span class="types ${elementTypes[0]}">${elementTypes[0]}</span>
                        ${elementTypes[1] === undefined ? '' : `<span class="types ${elementTypes[1]}">${elementTypes[1]}</span>`}
                    </div>
                    <h5 class="card-title">${data.name}</h5>
                </a>
            </li>`

        return cardInfo
        })
        .then(insertPokemonIntoPage)
}


Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage)
