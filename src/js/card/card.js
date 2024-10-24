import { pokemonList } from "../constants/constants.js";

// Translation data for Pokémon descriptions
const translations = {
    bulbasaur: "Bulbasaur é um Pokémon de tipo planta e veneno.",
    ivysaur: "Ivysaur é um Pokémon que evolui de Bulbasaur.",
    venusaur: "A planta floresce quando está absorvendo energia solar. Ela se move para buscar a luz do sol.",
    charmander: "Charmander é um Pokémon de tipo fogo. Ele libera fogo de sua cauda.",
    charmeleon: "Charmeleon é a forma evoluída de Charmander, mais temperamental.",
    charizard: "Charizard é a forma final de Charmander, conhecido por suas grandes asas.",
    squirtle: "Squirtle é um Pokémon de tipo água. Ele é conhecido por sua habilidade de nadar.",
    wartortle: "Wartortle é a forma evoluída de Squirtle, conhecida por sua agilidade na água.",
    blastoise: "Blastoise é um Pokémon que possui uma poderosa concha e pode disparar água em alta pressão.",
    // Adicione mais traduções conforme necessário
};

export async function createCard(pokemon, index) {
    try {
        // Busca a URL da espécie do Pokémon
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`);
        if (!speciesResponse.ok) {
            throw new Error(`Erro ao buscar detalhes da espécie para o Pokémon: ${pokemon.name}`);
        }
        const speciesData = await speciesResponse.json();

        // Verifica se há uma entrada para as descrições em inglês
        const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
        let description = descriptionEntry 
            ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ') 
            : "Descrição não disponível.";

        // Se houver uma tradução disponível, substitua a descrição
        description = translations[pokemon.name] || description;

        // Cria o card com a descrição
        const card = `
            <div class="card" style="width: 18rem;">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title" style="text-align: center;">${pokemon.name}</h5>
                    <p class="card-text">${description}</p>
                    <a href="${pokemon.url}" class="btn btn-primary">Ver mais</a>
                </div>
            </div>
        `;

        pokemonList.innerHTML += card;
    } catch (error) {
        console.error("Erro ao criar o card:", error);
        // Adiciona um card de erro, se necessário, para feedback visual
        pokemonList.innerHTML += `<div class="card-error">Não foi possível carregar ${pokemon.name}</div>`;
    }
}

