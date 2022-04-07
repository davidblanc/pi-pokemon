import axios from 'axios';
const _serverUrl = 'http://localhost:3001';

export const
    GET_POKEMONS = 'GET_POKEMONS',
    FILTER_BY_CREATED = 'FILTER_BY_CREATED',
    ORDER_BY = 'ORDER_BY',
    GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';


export function getPokemons() {
    return async function (dispatch) {
        let pokes = await axios.get(_serverUrl + '/pokemons');
        return dispatch({
            type: GET_POKEMONS,
            payload: pokes.data
        })
    }
}

export function orderPokemons(payload) {
    return {
        type: ORDER_BY,
        payload
    }
}


export function filterPokemonsByCreated(payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export function getPokemonById(payload) {
    return async function (dispatch) {
        let pokes = await axios.get(_serverUrl + '/pokemons/' + payload);
        return dispatch({
            type: GET_POKEMON_BY_ID,
            payload: pokes.data
        })
    }
}

