import React from 'react';

import { NavLink } from 'react-router-dom';

export default function SearchBar() {


	return (
		<div>
			<NavLink to="/pokemons">Home</NavLink>
			<NavLink to="/create">Crear Pokemon</NavLink>
		</div>
	);
}
