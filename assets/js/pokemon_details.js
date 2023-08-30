const detailsButton = document.getElementById('detailsButton');


function convertPokemonDetailsToOl(pokemon) { // Takes the "pokemon" object as argument and creates a list item to add to the OL list for a single pokemon.
    return `
    <h1>${pokemon.name}</h1>
    <ol id="pokemonAtributes">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <div class="attributes">
                    <span class="weight">Weight: ${pokemon.weight}</span>
                    <span class="height">Height: ${pokemon.height}</span>
                    <span class="abilities">Abilities: ${pokemon.abilities}</span>
                    <span class="moves">Moves: ${pokemon.moves}</span>
                </div>
            </div>
        </li>
    </ol>
    `
}

pokemonList.addEventListener('click', (event) => { // user click on Details button
    const detailsButton = event.target.closest('.detailsButton'); // gets the closest button using its class
    if (detailsButton) { // if there is a button
        const selectedPokemonData = detailsButton.getAttribute('data-pokemon'); // gets the data-pokemon attribute from the Details button
        localStorage.setItem('selectedPokemonData', selectedPokemonData); // stores the data in Browser's local storage using the key 'selectedPokemonData'
        console.log(selectedPokemonData)
    }
});

const pokemonDetailsContainer = document.getElementById('pokemonDetailsContainer');

window.onload = function() { // loads the page
    const selectedPokemonData = localStorage.getItem('selectedPokemonData'); // gets the data from Browser's local storage
    const selectedPokemon = JSON.parse(selectedPokemonData); // parses the data

    if (selectedPokemon) { // if there is data
        const detailsHtml = convertPokemonDetailsToOl(selectedPokemon); // converts the data to HTML
        pokemonDetailsContainer.innerHTML = detailsHtml; // adds the HTML to the container
    }
};
