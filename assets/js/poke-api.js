

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typesSlot) => typesSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((convertPokeApiDetailToPokemon))
}

pokeApi.getPokemons = (offset=0, limit=5) =>  {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) /*função de callback */
    .then((response) => response.json()) /*transformando o response da promisse em json */
    .then((jsonBody) =>  jsonBody.results) /*recebendo o body convertido */
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
        
}

