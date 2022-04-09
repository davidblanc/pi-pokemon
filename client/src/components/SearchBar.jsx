import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';

export default function SearchBar( {handleSearchPoke, setPokeName}) {



    return (
        <form> 
            <label htmlFor="search">Ingresa el nombre de Pokemon</label>
            <input onChange={e => setPokeName(e.target.value)} name="search" type="text" className="text" />
            <button type='submit' onClick={e => handleSearchPoke(e)}>Buscar</button>
        </form>
    )
}