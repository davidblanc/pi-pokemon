import './styles.css';
import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';


class NavBar extends Component {
	render() {
		return (
			<div className="navBar">
				<NavLink to="/pokemons">Home</NavLink>
				<NavLink to="/create">Crear Pokemon</NavLink>
			</div>
		);
	}
}

export default NavBar;

// export default function SearchBar() {

// 	return (
// <div className="navBar">
// 	<NavLink to="/pokemons">Home</NavLink>
// 	<NavLink to="/create">Crear Pokemon</NavLink>
// </div>
// 	);
// }
