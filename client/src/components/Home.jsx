import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons,filterPokemonsByCreated, orderPokemons, getPokemonByName } from '../actions';
import { Link } from 'react-router-dom';
//importo components
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import Paginas from './Paginas'
import FilterControls from './FilterControls';

const cantPerPag = 12;


export default function Home() {

    const [order,setOrder] = useState('')
    const [by,setBy] = useState('')
    const [filterType,setFilterType] = useState('') 
    const [exist,setExist] = useState('')
   
    const [pokeName,setPokeName] = useState('');
    // Redux
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons.filter((poke) => 
    {
        console.log(filterType);
        return (
            exist === '' ? true : poke.createdInDb.toString() === exist 
                || filterType === ''? true: (poke.type1.toString() === filterType) || (poke.type2.toString() === filterType)
                )
        }
    ));
    // estados locales
    
    const [page, setPage] = useState(1);
    const pokePaginado = pokemons.slice((page-1)*cantPerPag,page*cantPerPag);  
    

    useEffect(() => {
        dispatch(getPokemons());  
    }, [dispatch]);
    
    const handleClickRefresh = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
    }
    
    const handleSearchPoke = (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(pokeName))
    }    

    const handleClickFilter = (e) => {
        e.preventDefault();
        console.log (e.target.value);
       
    }


    // const handleFilterCreated = (e) => {
    //     e.preventDefault();
    //     setPage(1);  
    //     dispatch(filterPokemonsByCreated(e.target.value));
    // }

    // const orderBy = (e) => {
    //     e.preventDefault();
    //     dispatch(orderPokemons(e.target.value));
        
        // setOrderB('Order by ' + e.target.value);

    // }
    
    return (
        <div>
            <SearchBar handleSearchPoke={handleSearchPoke} setPokeName={setPokeName}/>
            <FilterControls handleClick={handleClickRefresh}
                            setOrder = {setOrder}
                            setBy = {setBy}
                            setFilterType = {setFilterType}
                            setExist = {setExist}
            />
                <Paginas cantPerPag={cantPerPag} cant={pokemons.length} setPagina={setPage} paginaActual={page}/>
                <div  className="pokemonList">
                {
                    pokePaginado?.map((poke) => {
                        return (
                            <Link key={poke.id} to={`/pokemons/${poke.id}`}>
                                <PokemonCard
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


        /* <div className="pokeSelects">
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
            <button onClick={handleClick} >Recargar</button>
                </div> */