const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db')
var _TYPESDB = false;
const router = Router();

router.get('/', async (req, res) => {
    if (!_TYPESDB) {
        let typesResult = await axios.get('https://pokeapi.co/api/v2/type');
        typesResult.data.results.forEach(typ => {
            Type.create({
                name: typ.name,
            })
        });
        _TYPESDB = true;
    }
    const typeResultDb = await Type.findByPk(2);
    console.log(typeResultDb);
    res.send(typeResultDb);

})

module.exports = router;