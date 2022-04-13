import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getPokemonByName } from '../actions';
import { Link } from 'react-router-dom';
//importo components
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import Paginas from './Paginas'
import FilterControls from './FilterControls';
import NavBar from './NavBar'

const cantPerPag = 3; // 12


export default function Home() {
    // control de filtros y orden
    const [order,setOrder] = useState('')
    const [by,setBy] = useState('name')
    const [filterType,setFilterType] = useState('') 
    const [exist,setExist] = useState('')

    // const [pokeName,setPokeName] = useState('');
    // Redux
    const dispatch = useDispatch();
    const errorD = useSelector(state => state.error )
    const pokemons = useSelector(state => state.pokemons
        .filter( (poke) => 
            exist === '' ? true : poke.createdInDb.toString() === exist        
            ))
        .filter( (poke) => filterType === '' ? true: poke.types.reduce((acc,type) => acc || type.name === filterType,false))
        .sort((pokeA,pokeB) => orderPokemons(pokeA,pokeB,order,by));

    // estados locales
    
    const [page, setPage] = useState(1);
    const pokePaginado = pokemons.slice((page-1)*cantPerPag,page*cantPerPag);  
   

    useEffect(() => {
        dispatch(getPokemons());  
    }, [dispatch]);
    
    useEffect(() => {
        setPage(1);
    }, [filterType,exist]);
    

    const handleClickRefresh = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
    }
    
    const handleSearchPoke = (pokeName) => {
        dispatch(getPokemonByName(pokeName));
        setPage(1);
  
    }    
    // setPokeName={setPokeName}
   
    return (
        <div>
            <div className='homePoke'>
                <div className="controlsSearchFilter">
                    <SearchBar handleSearchPoke={handleSearchPoke} error={errorD}/> 
                    <FilterControls handleClick={handleClickRefresh}
                                    setOrder = {setOrder}
                                    setBy = {setBy}
                                    setFilterType = {setFilterType}
                                    setExist = {setExist}
                    />
                </div>
                    <div className="pokePlace">
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
            </div>
        </div>

    )
}

const orderPokemons = (pokeA,pokeB,order,by) => { 
    if (order) {
        if (by === 'name') {
            if (order === 'asc')  {
                if (pokeA.name > pokeB.name) return 1;
                if (pokeB.name > pokeA.name) return -1;
                return 0;
            }
            else {
                if (pokeA.name > pokeB.name) return -1;
                if (pokeB.name > pokeA.name) return 1;
                return 0;
            }
        } 
        else if (by === 'attack') {
            if (order === 'asc')  {
                if (pokeA.attack > pokeB.attack) return 1;
                if (pokeB.attack > pokeA.attack) return -1;
                return 0;
            }
            else {
                if (pokeA.attack > pokeB.attack) return -1;
                if (pokeB.attack > pokeA.attack) return 1;
                return 0;
            }
        }
        return 0;
        
    }
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