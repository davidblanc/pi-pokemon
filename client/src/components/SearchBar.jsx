import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';

export default function SearchBar({ handleSearchPoke }) {
	const [ pokeName, setPokeName ] = useState('');

   

    const handlerOnSubmit = (e) => {
        e.preventDefault();
        handleSearchPoke(pokeName);
        setPokeName('');
    }

	return (
		<form className="searchBarStyle"
			onSubmit={(e) => {
				handlerOnSubmit(e);
			}}
		>
			<label htmlFor="search">Buscar por nombre</label>
			<input required onChange={(e) => setPokeName(e.target.value)} name="search" type="text" className="text" value={pokeName}/>
			<button type="submit">Buscar</button>
		</form>
	);
}
