const { Router } = require('express');
const axios = require('axios');
const { Pokemon } = require('../db');
const _LIMIT = 2;
const router = Router();

router.get('/', async (req, res) => {
    const pokes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit='+_LIMIT);
    let pokeMap = await Promise.all( pokes.data.results.map(async el => {
        const poke = await axios.get(el.url)
        return {
            id: poke.data.id,
            name: poke.data.name,
            img: poke.data.sprites.other['official-artwork'].front_default,
            types: poke.data.types.map(el => el.type.name),
            hp: getStat(poke.data.stats,'hp'),
            attack:getStat(poke.data.stats,'attack') ,
            defense:getStat(poke.data.stats,'defense'),
            speed:getStat(poke.data.stats,'speed'),
            height: poke.data.height,
            weight: poke.data.weight
        };
        
    })
    );
    console.log(pokeMap);
    res.send (pokeMap);

    
    // axios.get('https://pokeapi.co/api/v2/pokemon?limit=2').
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

})

router.get('/')

// Trae el valor del stat del arreglo de 'stats' cuyo nombre es 'name'
function getStat(stats, name) {
    for( let i = 0; i < stats.length; i++) {
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