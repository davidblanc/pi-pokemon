import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons,filterPokemonsByCreated, orderPokemons } from '../actions';
import { Link } from 'react-router-dom';
//importo components
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import Paginas from './Paginas'

const cantPerPag = 12;


export default function Home() {
    // Redux
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons);
    // estados locales
    const [page, setPage] = useState(1);

    const [orderB, setOrderB] = useState('');

    const pokePaginado = pokemons.slice((page-1)*cantPerPag,page*cantPerPag);  
    

    useEffect(() => {
        dispatch(getPokemons());
        
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
    }   

    const handleFilterCreated = (e) => {
        e.preventDefault();
        setPage(1);  
        dispatch(filterPokemonsByCreated(e.target.value));
    }

    const orderBy = (e) => {
        e.preventDefault();
        dispatch(orderPokemons(e.target.value));
        setPage(1);
        setOrderB('Order by ' + e.target.value);

    }

    return (
        <div>
            <SearchBar/>
            <button onClick={handleClick} >Recargar</button>
                <div className="pokeSelects">
                    <select onChange={handleFilterCreated} name="" id="">
                        <option value="all">Creados y Existentes</option>
                        <option value="false">Existente</option>
                        <option value="true">Creado</option>
                    </select>
                    <select name="" id="">
                        <option value="all">Todos los tipos</option>
                    </select>
                    <select onChange={orderBy} name="" id="">
                        <option value="asc">Orden Ascendente</option>
                        <option value="desc">Orden Descendente</option>
                    </select>
                    <select name="" id="">
                        <option value="name">Orden por Nombre</option>
                        <option value="attack">Orden por Fuerza</option>
                    </select>
                </div>
                <Paginas cantPerPag={cantPerPag} cant={pokemons.length} setPagina={setPage} paginaActual={page}/>
                <div  className="pokemonList">
                {
                    pokePaginado?.map((poke) => {
                        return (
                            <Link to={`/pokemons/${poke.id}`}>
                              <PokemonCard
                                  key={poke.id}
                                  name={poke.name}
                                  img={poke.img}
                                  types={poke.types}
                              />
                            </Link>
                        )
                    })
                }
            </div>
        </div>

    )
}