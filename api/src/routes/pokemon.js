const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const _LIMIT = 2;
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    if (name) {
        try {
            const pokeResul = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            // const pokeResulDb = await Pokemon.find
            res.status(200).send(pokeResul.data);
        }
        catch (error) {
            res.status(404).send(`El pokemon ${name} no existe`);
        }

    } else {
        const pokeResul = await getPokesFromApi();  // trae todo de la api max _LIMIT
        const pokeResulDb = await getPokesFromDb(); // trat todo de la DB
        res.send(pokeResul.concat(pokeResulDb));    // concatena las dos y devuelve

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
    // const pokeResultDb = await Pokemon.findByPk(id);
    // if (pokeResultDb) {
    //     res.status(200).send(pokeResultDb);
    // } else {
    try {
        const pokeResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        res.status(200).send(getPropsFromPoke(pokeResult.data));
    }
    catch (err) {
        res.status(404).send(`No existe un pokemon con id ${id}`);
    }
    // }
});



router.post('/', async (req, res) => {
    const { name, img, types, hp, attack, defense, speed, height, weight, createdInDb } = req.body;
    console.log(name);
    let pokeCreated = await Pokemon.create({
        name,
        img,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDb
    })

    let typesPoke = await Type.findAll({
        where: {
            name: types
        }
    })

    pokeCreated.addTypes(typesPoke);

    res.send(`El Pokemon ${name} ha sido creado con éxito.`);


})



// trae todos los pokes de la db

async function getPokesFromDb() {
    return await Pokemon.findAll({
        include: {
            model: Type
        }
    })

}

// trae todos los pokes limitado a _LIMIT de la api

async function getPokesFromApi() {

    const pokes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + _LIMIT);
    let pokeResul = await Promise.all(pokes.data.results.map(async el => {
        const poke = await axios.get(el.url);
        return getPropsFromPoke(poke.data);
    }));
    return pokeResul;
}


//trae props pedidas del pokemon
function getPropsFromPoke(poke) {
    return {
        id: poke.id,
        name: poke.name,
        img: poke.sprites.other['official-artwork'].front_default,
        types: poke.types.map(el => el.type.name),
        hp: getStat(poke.stats, 'hp'),
        attack: getStat(poke.stats, 'attack'),
        defense: getStat(poke.stats, 'defense'),
        speed: getStat(poke.stats, 'speed'),
        height: poke.height,
        weight: poke.weight
    }

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