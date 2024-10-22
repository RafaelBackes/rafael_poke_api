import { urlPokeApi } from "../constants/constants.js";
import showError from "../errors/errors.js";

export async function listAllPokemons(urlApi = urlPokeApi, limit = 100, offset = 0) {
    try {
        const data = await fetch(`${urlApi}?limit=${limit}&offset=${offset}`);
        const response = await data.json();
        return response;
    } catch (error) {
        showError("Ops! Um erro inesperado ocorreu ao carregar a lista de Pokémon!");
        console.error(error.message);
    }
}


