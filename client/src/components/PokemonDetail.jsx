import './styles.css';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../actions';
import { useParams } from 'react-router-dom';

import NavBar from './NavBar'

export default function PokemonDetail() {
    const poke = useSelector(state => state.pokemonDetail);
    const dispatch = useDispatch();

    let { id } = useParams();

    useEffect(() => {
        
        dispatch(getPokemonById(id))
        
        return () => {
            
        }
        // eslint-disable-next-line
    }, [])


    return (
        
        <div>
            {/* <div className="pokemonDetailCont"> */}
                <div className='pokemonDetail'>
                    <h1>Detalles de {poke.name}</h1>
                    <img src={poke.img} alt='main-img'></img>
                    <div className='pokemonDetailDatos'>
                        <h3 className='detailTitle'>NOMBRE:<br />{poke.name}</h3>
                            <div className="detailTypes">
                                <h2>Tipos</h2>
                                <ul>
                                    {
                                        poke.types?.map((type, i) => {
                                            return (
                                                <li key={i}>{type.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="detailStats">
                                <h2>Stats</h2>
                                <ul>
                                    <li><span>Vida:</span> <b>{poke.hp}</b></li>
                                    <li><span>Fuerza:</span> <b>{poke.attack}</b></li>
                                    <li><span>Defensa: </span><b>{poke.defense}</b></li>
                                    <li><span>Velocidad:</span> <b>{poke.speed}</b></li>
                                    <li><span>Altura:</span> <b>{poke.height}</b></li>
                                    <li><span>Peso:</span> <b>{poke.weight}</b></li>
                                </ul>
                            </div>
                    
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

// [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// [ ] Número de Pokemon (id)
// [ ] Estadísticas (vida, fuerza, defensa, velocidad)
// [ ] Altura y peso