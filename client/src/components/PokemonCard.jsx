import './styles.css'

import React from 'react';


export default function PokemonCard({ name, img, types}) {
    return (
        <div className="PokemonCard">
            <h2>{name}</h2>
            <img src={img} alt="imagen" />
            <ul><h3>Tipos</h3>
                {
                    types.map((type, i) => {
                        return (
                            <li key={i}> {type.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )

}