import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";


const { count, results } = await listAllPokemons();
console.log("Pokémons (results): ", results);
results.forEach((pokemon, index) => {
    createCard(pokemon, index + 1);
});

import { listAllPokemons } from "./fetchApi/fetchfunctions.js";
import { createCard } from "./card/card.js";
import { pokemonList } from "../constants/constants.js";

let currentPage = 0;

async function loadPage(page) {
    const offset = page * 100;
    const response = await listAllPokemons(urlPokeApi, 100, offset);
    if (response && response.results) {
        const { results } = response;
        pokemonList.innerHTML = ''; // Limpa a lista de Pokémon
        results.forEach((pokemon, index) => {
            createCard(pokemon, offset + index + 1);
        });
        // Atualiza o estado dos botões
        document.getElementById('prev-page').disabled = page === 0;
        document.getElementById('next-page').disabled = results.length < 100;
    } else {
        showError("Nenhum Pokémon foi encontrado.");
    }
}

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        loadPage(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    currentPage++;
    loadPage(currentPage);
});

// Carrega a primeira página
loadPage(currentPage);


