const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    let typesHtml = '';
    if (pokemon.types.length === 1) {
        typesHtml = `
            <li class="type ${pokemon.types[0]}">${pokemon.types[0]}</li>
            <li class="type invisible">&nbsp;</li>
        `;
    } else {
        typesHtml = pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
    }
    
    const isElectric = pokemon.types.includes('electric');
    const detailsButtonClass = isElectric ? 'electric' : '';

    return `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
        <ol class="types">
            ${typesHtml}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    <button class="detailsButton" data-pokemon='${JSON.stringify(pokemon)}'>
        <a href="pokemon_details.html">Details</a>
    </button>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
