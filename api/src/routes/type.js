const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db')
var _TYPESDB = false;
const router = Router();

router.get('/', async (req, res) => {
    // SE COLOCA LA CARGA DE TYPES AL LEVANTAR EL SEVER

    // if (!_TYPESDB) {
    //     let typesResult = await axios.get('https://pokeapi.co/api/v2/type');
    //     let resu =  typesResult.data.results.map(typ => {
    //         Type.create({
    //             name: typ.name,
    //         })
    //         return {
    //             name: typ.name
    //         }
    //     });
    //     _TYPESDB = true;
    //     res.send (resu)
    // }else {
        const typeResultDb = await Type.findAll();
        res.send(typeResultDb);

    // }

})

module.exports = router;