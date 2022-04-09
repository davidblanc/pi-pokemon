import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../actions';
import { Link } from 'react-router-dom';

export default function FilterControls({ handleClick, setOrder, setBy, setFilterType, setExist }) {
	const types = useSelector((state) => state.types);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTypes());
	},[]);

	return (
		<div className="pokeSelects">
			<select onChange={e => setExist(e.target.value)} name="createdOrApi" id="">
				<option value="">Creados y Existentes</option>
				<option value="false">Existente</option>
				<option value="true">Creado</option>
			</select>
			<select onChange={e => setFilterType(e.target.value)} name="types" id="" onChange0>
				<option value="">Tipos de Pokemon</option>
				{types.map((type, i) => {
					return (
						<option key={i} value={type.name}>
							{type.name}
						</option>
					);
				})}
			</select>
			<select onChange={setOrder} name="orderAscDesc" id="">
				<option value="">Elegir Orden</option>
				<option value="asc">Orden Ascendente</option>
				<option value="desc">Orden Descendente</option>
			</select>
			<select name="" id="byNameAttack">

				<option value="">Ordenar según...</option>
				<option value="name">Orden por Nombre</option>
				<option value="attack">Orden por Fuerza</option>
			</select>
			<button onClick={handleClick}>Recargar</button>
		</div>
	);
}
