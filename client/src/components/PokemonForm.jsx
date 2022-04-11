import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postPokemon } from '../actions';
import NavBar from './NavBar';

//regex
const imgUrlCheck = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
// const numCheck = /^\d+$/;
const nameCheck = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;


export default function PokemonForm() {
	const types = useSelector((state) => state.types);
	const dispatch = useDispatch();

	const [ error, setError ] = useState({});
	const [ inputs, setInputs ] = useState({
		name: '',
		img: '',
		hp: 0,
		attack: 0,
		defense: 0,
		speed: 0,
		height: 0,
		weight: 0,
		type1: 'normal',
		type2: ''
	});
	const varsToStas = Object.entries(inputs).filter(
		(e) => e[0] !== 'img' && e[0] !== 'name' && e[0] !== 'type1' && e[0] !== 'type2'
	);

	// se valida para que funcione la ruta si se accecede sin pasasr por home al menos una vez
	useEffect(() => {
		!types.length && dispatch(getTypes());
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setError({
			...error,
			name:
				inputs.name.length > 10 || inputs.name.length < 3 || !nameCheck.test(inputs.name)
					? 'Ingrese nombre válido(10>name>3)'
					: '',
			types: inputs.type1 === inputs.type2 ? 'No puedes elegir dos tipos iguales' : '',
			img: imgUrlCheck.test(inputs.img)? '' :'Ingrese una enlace correcto.' 
		})
		// eslint-disable-next-line
	},[inputs]);

	// onChanges
	const onChanges = (e) => {
		e.preventDefault();

		// validationError(e);

		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});

	
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
		//reset form
		setInputs({
			name: '',
			img: '',
			hp: 0,
			attack: 0,
			defense: 0,
			speed: 0,
			height: 0,
			weight: 0,
			type1: 'normal',
			type2: ''
		})
	};

	return (

		<div>
			<NavBar/>
			<form className="formPoke" onSubmit={(e) => handlerOnSubmit(e)}>
				<h1>Crear Pokemon Nuevo</h1>
					<div className="nameForm">
						<input
							// className={error && 'danger'}
							name="name"
							value={inputs.name}
							placeholder="Nombre del pokemon"
							onChange={(e) => onChanges(e)}
							required
						/>
						{!error.name ? null : <span>{error.name}</span>}
					</div>
					<div className="imgForm">
						<input
							// className={error && 'danger'}
							onChange={onChanges}
							type="url"
							name="img"
							value={inputs.img}
							placeholder="Ingrese URL de la imagen..."
						/>
						{!error.img ? null : <span>{error.img}</span>}
					</div>
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
					<div className="typesForm">
						<div>
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
						</div>
						<div>{!error.types ? null : <span>{error.types}</span>}</div>
					</div>
			
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
				<input
					disabled={error.name || error.types || error.img ? true : undefined}
					type="submit"
				/>
			</form>
		</div>
	);
}
