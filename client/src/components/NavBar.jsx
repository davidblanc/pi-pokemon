import './styles.css';
// import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default function SearchBar() {
	return (
		<div className="navBar">
			<NavLink className="navNo" activeClassName="navSelected" exact to="/pokemons">Home</NavLink>
			<NavLink className="navNo" activeClassName="navSelected" to="/pokemons/create">Crear Pokemon</NavLink>
		</div>
	);
}
