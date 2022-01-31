const express = require('express');
const router = express.Router();
let { Item } = require('../db');

router.get('/', async (req, res) => {
	const items = await Item.findAll({
			attributes: ['id', 'name'],
		});
		items = items.map((i) => {
			return { id: i.id, name: i.name };
		});
	items.length
		? res.send(items)
		: res.status(400).send('Los items no pudieron obtenerse correctamente');
});

router.post ('/', async (req, res, next) => { 
    try {
        const { name, id, image } = req.body;
        const newItem = await Item.create({ 
        name,
        id,
        image,
        })
        res.status(201).send ('Item creado correctamente')
    } catch (error){
    next(error);
}
})

module.exports = router;
