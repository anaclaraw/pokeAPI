const addMoreButton = document.getElementById('addMoreButton')
const backButton = document.getElementById('backButton')
const pokemonList = document.getElementById('pokemonslist')
const content = document.getElementById('content')
let limit = 20
let offset = 0
const maxRecords = 151

function addMoreItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons);
        const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon ${pokemon.type}" >
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
                 
                 </div>
                 <button type="button" onclick="selectItems(${pokemon.number})">gag</butyon>
    </li>
`).join('');
        pokemonList.innerHTML = newHtml
    })

}
addMoreItens()

addMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        addMoreItens(offset, newLimit)

        addMoreButton.parentElement.removeChild(addMoreButton)
    } else {
        addMoreItens(offset, limit)
    }
}
)
backButton.addEventListener('click', () => {
    offset -= limit
    if (offset <= -20) {
        backButton.disabled = true;
    } else {
        addMoreItens(offset, limit)
    }
})


function selectItems(pokemonNumber) {
    url = ` https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            content.innerHTML = `
           <div class="selection ${data.types[0].type.name}">
            <button id="buttonBackSelection" onclick="location.reload()"><img src="https://cdn-icons-png.flaticon.com/512/109/109618.png" width="32" height="32"/></button>
            <h1>${data.name}</h1>
            <img src="${data.sprites.other.dream_world.front_default}"/>
            <p class="types"> ${data.types.map((type) => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')} </p>
                <div class="container">
                    <div class="detals"> <strong> Base Experience:</strong> <p class="base_experience"> ${data.base_experience}</p> </div>
                   <div class="detals"> <strong>Abilites:</strong> <p class="Abilites"> ${data.abilities.map((ability) => `<span class="ability ${ability.name}">${ability.ability.name} </span>`)}</p></div>
                    <div class="detals"> <strong>Height:</strong> <p class="height"> ${data.height}</p> </div>
                    <div class="detals"> <strong>Especie:</strong> <p class="specie"> ${data.species.name}</p> </div>
                    
                </div>
           </div>
        `
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

