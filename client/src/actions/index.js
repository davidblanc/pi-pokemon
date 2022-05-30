import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const _serverUrl = process.env.REACT_APP_API ;
console.log(process.env.REACT_APP_API,'react-app');
console.log( _serverUrl,'URL API');

export const GET_POKEMONS = 'GET_POKEMONS',
	FILTER_BY_CREATED = 'FILTER_BY_CREATED',
	ORDER_BY = 'ORDER_BY',
	GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID',
	GET_TYPES = 'GET_TYPES',
	POST_POKEMON = 'POST_POKEMON',
	GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME',
	ERROR= 'ERROR';

export function getPokemons() {
	console.log('Entro a getPokemons function');
	return async function(dispatch) {
		try {
			let pokes = await axios.get(_serverUrl + '/pokemons');
			return dispatch({
				type: GET_POKEMONS,
				payload: pokes.data
			});
		} catch (e) {
			console.log(e.toJSON());
			alert('No se pudo traer la lista de pokemones');
		}
	};
}
export function getTypes() {
	return async function(dispatch) {
		let types = await axios.get(_serverUrl + '/types');
		return dispatch({
			type: GET_TYPES,
			payload: types.data
		});
	};
}

export function getPokemonById(payload) {
	return async function(dispatch) {
		try {
			let pokes = await axios.get(_serverUrl + '/pokemons/' + payload);
			return dispatch({
				type: GET_POKEMON_BY_ID,
				payload: pokes.data
			});
		} catch (err) {
			alert('Pokemon no existe');
			// window.location.replace('http://localhost:3000/error-404')

		}
	};
}
export function getPokemonByName(payload) {
	return async function(dispatch) {
		try {
			let pokes = await axios.get(_serverUrl + '/pokemons?name=' + payload.toLowerCase());
			return dispatch({
				type: GET_POKEMON_BY_NAME,
				payload: pokes.data
			});
		} catch (err) {
			// alert(`No existe un pokemon de nombre ${payload}`);
			return dispatch({
				type: ERROR,
				payload: `No existe un pokemon de nombre ${payload}`
			});
		}
	};
}

export function postPokemon(payload) {
	return async function(dispatch) {
		try {
			let poke = await axios.post(_serverUrl + '/pokemons/', payload);
			alert(`El pokemon ${payload.name} fue creado correctamente`);
			return dispatch({
				type: POST_POKEMON,
				payload: poke.data
			});
		} catch (error) {
			alert(`El pokemon ${payload.name} ya existe`);
		}
	};
}
// export function orderPokemons(payload) {
// 	return {
// 		type: ORDER_BY,
// 		payload
// 	};
// }

// export function filterPokemonsByCreated(payload) {
// 	return {
// 		type: FILTER_BY_CREATED,
// 		payload
// 	};
// }
