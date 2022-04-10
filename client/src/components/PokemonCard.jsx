import './styles.css'

import React from 'react';


export default function PokemonCard({ name, img, types}) {
    return (
        <div className="PokemonCard">
            <h2>{name}</h2>
            <img src={img?img:'https://i.pinimg.com/originals/3d/f6/ef/3df6eff48175fa05ec90a00415fcfe25.png'} alt="imagen" />
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