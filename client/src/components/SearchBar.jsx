import React from 'react';
import { useState, useEffect } from 'react';

export default function SearchBar() {
    const [input, setInput] = useState();


    return (
        <div>
            <label htmlFor="search">Ingresa el nombre de Pokemon</label>
            <input onChange={e => setInput(e.target.value)} name="search" type="text" className="text" />
            <button>Buscar</button>
        </div>
    )
}