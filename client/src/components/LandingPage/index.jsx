import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

export default function LandingPage () {
    return (
        <div>
            <h1>Bienvenidos a PI Pokemon</h1>
            <Link to='/pokemons'>
                <button className='button'>Ingresar</button>
            </Link>
        </div>
    )
}