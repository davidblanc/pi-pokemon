const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const _LIMIT = 10;
const router = Router();
const UUIDcheck = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i; // validacion de UUID

router.get('/', async (req, res) => {
	const { name } = req.query;
	if (name) {
		// si tiene name lo busca primero en la DB
		const pokeResultDb = await Pokemon.findOne({
			where: {
				name
			},
			include: {
				model: Type,
				attributes: [ 'name' ],
				through: {
					attributes: []
				}
			}
		});

		if (pokeResultDb) return res.status(200).send(pokeResultDb);
		else {
			// si no lo encontró (null) lo busca en la api
			try {
				// console.log('entro axios');
				const pokeResul = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
				return res.status(200).send(getPropsFromPoke(pokeResul.data));
			} catch (error) {
				res.status(404).send(`El pokemon ${name} no existe`);
			}
		}

		// no hay name, trae todos los poke
	} else {
		const pokeResul = await getPokesFromApi(); // trae todo de la api max _LIMIT
		console.log('SALIO DE LA API')
		const pokeResulDb = await getPokesFromDb(); // trat todo de la DB
		res.status(200).send(pokeResul.concat(pokeResulDb)); // concatena las dos y devuelve
	}

	// axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + _LIMIT).
	//     then((response) => res.send(response.data.results.map( el => {
	//         axios.get(el.url)
	//         .then((response) => {
	//             poke = response.data;
	//             let res = {
	//                 name: poke.name,
	//                 img: poke.sprites.front_default,
	//                 types: poke.types.map(el => el.type.name)
	//             };
	//             return res;
	//         } );
	//     })))
	//     .catch((err) => res.send(err));
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	if (UUIDcheck.test(id)) {
		const pokeResultDb = await Pokemon.findByPk(id, {
			include: {
				model: Type,
				attributes: [ 'name' ],
				through: {
					attributes: []
				}
			}
		});
		res.status(200).send(pokeResultDb);
	} else {
		try {
			const pokeResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
			res.status(200).send(getPropsFromPoke(pokeResult.data));
		} catch (err) {
			if (err.response.status === 404) {
				return res.status(err.response.status).send(`No existe un pokemon con id ${id}`);
			} else {
				return res.status(err.response.status).send(`Error`);
			}
		}
	}
});

router.post('/', async (req, res) => {
	const { name, img, types, hp, attack, defense, speed, height, weight, createdInDb } = req.body;
	
	try {
		let pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
		return res.status(404).send(`El pokemon ${name} ya existe`);
	} catch (e) {
		let [ pokeCreated, created ] = await Pokemon.findOrCreate({
			where: {
				name
			},
			defaults: {
				img,
				hp,
				attack,
				defense,
				speed,
				height,
				weight,
				createdInDb
			}
		});

		if (created) {
			let typesPoke = await Type.findAll({
				where: {
					name: types
				}
			});

			pokeCreated.addTypes(typesPoke);
			res.send(`El Pokemon ${name} ha sido creado con éxito.`);
		} else res.status(404).send(`El pokemon ${name} ya existe`);
	}
});

// trae todos los pokes de la db

async function getPokesFromDb() {
	return await Pokemon.findAll({
		include: {
			model: Type,
			attributes: [ 'name' ],
			through: {
				attributes: []
			}
		}
	});
}

// trae todos los pokes limitado a _LIMIT de la api

async function getPokesFromApi() {
	try {
		const pokes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + _LIMIT);
		let pokeResul = await Promise.all(
			pokes.data.results.map(async (el, i) => {
				try{
					let poke = await axios.get(el.url);
					p = getPropsFromPoke(poke.data);
					console.log(i,p);
					return p
				}catch (err) {
					return {}
				}
				// return getPropsFromPoke(poke.data);
			})
		);
		
		return pokeResul;
	} catch (err) {
		console.log(err);
	}
}

//trae props pedidas del pokemon
function getPropsFromPoke(poke) {
	return {
		id: poke.id,
		name: poke.name,
		img: poke.sprites.other['official-artwork'].front_default,
		types: poke.types.map((el) => {
			return {
				name: el.type.name
			};
		}),
		hp: getStat(poke.stats, 'hp'),
		attack: getStat(poke.stats, 'attack'),
		defense: getStat(poke.stats, 'defense'),
		speed: getStat(poke.stats, 'speed'),
		height: poke.height,
		weight: poke.weight,
		createdInDb: false
	};
}

// Trae el valor del stat del arreglo de 'stats' cuyo nombre es 'name'
function getStat(stats, name) {
	for (let i = 0; i < stats.length; i++) {
		if (stats[i].stat.name === name) return stats[i].base_stat;
	}
	return 0;
}

module.exports = router;

// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre * (name)
// Vida     (poke.stats.[x].stat.name = 'hp')
// Fuerza   (poke.stats.[x].stat.name = 'attack')
// Defensa  (poke.stats.[x].stat.name = 'defense')
// Velocidad  (poke.stats.[x].stat.name = 'speed')
// Altura     poke.height
// Peso       poke.weight
