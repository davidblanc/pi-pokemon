import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postPokemon } from '../actions';


export default function PokemonForm() {
	const types = useSelector((state) => state.types);
	const dispatch = useDispatch();

	const [ error, setError ] = useState('Rellene los datos por favor');
	const [ inputs, setInputs ] = useState({
		name: '',
        img:'',
		hp: 0,
		attack: 0,
		defense: 0,
		speed: 0,
		height: 0,
		weight: 0,
		type1: 'normal',
		type2: ''
	});
	const varsToStas = Object.entries(inputs).filter((e) => e[0] !== 'img' && e[0] !== 'name' && e[0] !== 'type1' && e[0] !== 'type2');

	// se valida para que funcione la ruta si se accecede sin pasasr por home al menos una vez
	useEffect(() => {    
		!types.length && dispatch(getTypes());
	}, []);

	useEffect(() => {});
	// onChanges
	const onChanges = (e) => {
		e.preventDefault();

		setError(validationError(e));

		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});
	};

	// Validacion de errores
	const validationError = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		switch (name) {
			case 'name':
				return value.length > 10 || value.length < 3 
                ? error? error + ' y el Nombre debe contener entre 4 y 10 caracteres': 'El Nombre debe contener entre 4 y 10 caracteres'
                : '';
            case 'type2':
                return value === inputs.type1
                ? error? error + ' y no puedes elegir dos tipos iguales': 'No puedes elegir dos tipos iguales'
                : ''
			default:
				return 'Rellene los datos por favor';
		}
	};

	const handlerOnSubmit = (e) => {
		e.preventDefault();
		dispatch(
			postPokemon({
				...inputs,
				name: inputs.name.toLowerCase(),
				types: [ inputs.type1, inputs.type2 ]
			})
		);	
	};

	return (
		<form className="formPoke">
			<h1>Crear Pokemon Nuevo</h1>
			{!error ? null : <span>{error}</span>}
			<input
				className={error && 'danger'}
				name="name"
				value={inputs.name}
				placeholder="Nombre del pokemon"
				onChange={(e) => onChanges(e)}
			/>

			<input onChange={onChanges} className={error && 'danger'} type="url" name="img" value={inputs.img} placeholder="Ingrese URL de la imagen..." />
			{/* stats */}
			{varsToStas.map(([ name, value ], i) => {
				return (
					<label key={i} htmlFor={name}>
						{name}
						<input
							type="range"
							name={name}
							value={value}
							min="0"
							max="100"
							onChange={(e) => onChanges(e)}
						/>
						<span>{value}</span>
					</label>
				);
			})}
			{/* types */}
			<select onChange={(e) => onChanges(e)} name="type1" id="">
				{types.map((type, i) => {
					return (
						<option key={i} name="type1" id="" value={type.name}>
							{type.name}
						</option>
					);
				})}
			</select>
			<select onChange={(e) => onChanges(e)} name="type2" id="">
				<option value="">agregar un tipo </option>
				{types.map((type, i) => {
					return (
						<option key={i} name="type2" id="" value={type.name}>
							{type.name}
						</option>
					);
				})}
			</select>

			{/* <label htmlFor="hp">
				Vida: {inputs.hp}
				<input
					type="range"
					name="hp"
					value={inputs.hp}
					min="0"
					max="100"
					onChange={(e) => onChanges(e)}
				/>
			</label>
			<label htmlFor="attack">
				Vida: {inputs.attack}
				<input
					type="range"
					name="attack"
					value={inputs.attack}
					min="0"
					max="100"
					onChange={(e) => onChanges(e)}
				/>
			</label>
			<label htmlFor="defense">
				Vida: {inputs.defense}
				<input
					type="range"
					name="defense"
					value={inputs.defense}
					min="0"
					max="100"
					onChange={(e) => onChanges(e)}
				/>
			</label>
			<label htmlFor="speed">
				Vida: {inputs.speed}
				<input
					type="range"
					name="speed"
					value={inputs.speed}
					min="0"
					max="100"
					onChange={(e) => onChanges(e)}
				/>
			</label>
			<label htmlFor="height">
				Vida: {inputs.height}
				<input
					type="range"
					name="height"
					value={inputs.height}
					min="0"
					max="100"
					onChange={(e) => onChanges(e)}
				/>
			</label>
			<label htmlFor="weight">
				Vida: {inputs.weight}
				<input
					type="range"
					name="weight"
					value={inputs.weight}
					min="0"
					max="100"
					onChange={(e) => onChanges(e)}
				/>
			</label> */}

			<input disabled={error ? true : undefined} onClick={(e) => handlerOnSubmit(e)} type="submit" />
		</form>
	);
}
