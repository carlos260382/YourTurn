const express = require('express');
const router = express.Router();
const { Center } = require ('../db'); 


router.get('/', (req, res, next) => {
	const centers = Center.findAll({
    include:[{
        model: Item, 
        attributes:['id' , 'name'],
        through:{
            attributes:[]
        }
    }]
});
    centers.then((results) => {
      res.send(results);
    }).catch((error) => next(error));
  });

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Center
      .findByPk(id)
      .then((result) => res.send(result))
      .catch((error) => next(error));
  });

  router.post ('/', async (req, res, next) => { 
    try {
        const { name, id, description, category, address, image, city, adminID, itemID } = req.body;
        const newCenter = await Center.create({ 
        name,
        id,
        image,
        description, 
        category,
        address,
        city,
        })
        await newCenter.addAdmin(adminID);
        await newCenter.addItem(itemID);
        res.status(201).send ('Centro creado correctamente')
    } catch (error){
    next(error);
}
})

  router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    Center
      .update(body, {
        where: {
          id,
        },
      })
      .then(() => {
        res.send('Modificado correctamente');
      })
      .catch((error) => next(error));
  });


module.exports = router;