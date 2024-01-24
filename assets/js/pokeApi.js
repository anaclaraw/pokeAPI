const pokeApi = {}

 function convertPokemonDetail(pokeDetail){
    const pokemon = new Pokemon;
   pokemon.name = pokeDetail.name
   pokemon.number = pokeDetail.order
   const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
   const [type] = types
   pokemon.types = types
   pokemon.type = type
   pokemon.photo = pokeDetail.sprites.other.dream_world.front_default  
   return pokemon
 }

pokeApi.getPokemonsDetail = (pokemon) =>{
    console.log(pokemon.url);
    return fetch(pokemon.url).then((reponse) => reponse.json())
    .then(convertPokemonDetail)
   
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) =>jsonBody.results)
    .then((pokemons)=> pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails)=> pokemonsDetails)
    .catch((error)=> console.error(error))


}
