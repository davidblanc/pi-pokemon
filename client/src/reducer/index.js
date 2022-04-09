import {
	GET_POKEMONS,
	FILTER_BY_CREATED,
	ORDER_BY,
	GET_POKEMON_BY_ID,
	GET_TYPES,
	POST_POKEMON,
	GET_POKEMON_BY_NAME
} from '../actions';

const initialState = {
	pokemons: [],
	pokemonsBackup: [],
	pokemonDetail: {},
	types: []
};

function pokeReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
				pokemonsBackup: action.payload
			};
		case FILTER_BY_CREATED:
			return {
				...state,
				pokemons: state.pokemonsBackup.filter(
					(poke) => (action.payload === 'all' ? true : poke.createdInDb.toString() === action.payload)
				)
			};

		case ORDER_BY:
			return {
				...state,
				pokemons:
					action.payload === 'asc'
						? state.pokemonsBackup.sort((a, b) => {
								if (a.name > b.name) return 1;
								if (b.name > a.name) return -1;
								return 0;
							})
						: state.pokemonsBackup.sort((a, b) => {
								if (a.name > b.name) return -1;
								if (b.name > a.name) return 1;
								return 0;
							})
			};
		case GET_POKEMON_BY_ID:
			return {
				...state,
				pokemonDetail: action.payload
			};
		case GET_POKEMON_BY_NAME:
			return {
				...state,
				pokemons: [action.payload]
			};
		case GET_TYPES:
			return {
				...state,
				types: action.payload
			};
		case POST_POKEMON:
			return {
				...state
			};
		default:
			return state;
	}
}

export default pokeReducer;
