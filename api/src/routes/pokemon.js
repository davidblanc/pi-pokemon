const { Router } = require('express');
const axios = require('axios');
const { Pokemon } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const pokes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2');
    let pokeMap = await Promise.all( pokes.data.results.map(async el => {
        const poke = await axios.get(el.url)
        let res = {
            name: poke.data.name,
            img: poke.data.sprites.front_default,
            types: poke.data.types.map(el => el.type.name)
        };
        return res;
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




module.exports = router;


