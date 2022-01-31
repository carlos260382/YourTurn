const express = require('express');
const router = express.Router();
const { Service, Item } = require ('../db'); 
const { Op } = require("sequelize");

router.get('/', (req, res, next) => {
	const services = Service.findAll({
  include: {
    model: Item,
  },
});
    services.then((results) => {
      res.send(results);
    }).catch((error) => next(error));
  });

  router.get('/name', async (req, res) => {
    const { name } = req.query;
    if (name) {
      const result = await Service.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      });
      res.status(200).json(result);
    } 
  });
  
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const service = await Service.findByPk(id, { include: Item });
      if (service) {
        res.status(200).send(service);
      } else if (!service) {
        res.status(404).send("No hay un servicio con ese id");
      }
    } catch (err) {
      next(err);
    }
  }); 
  
  router.post ('/', async (req, res, next) => {
    try {
      const {
        name,
        price,
        image,
        description,
        available,
        itemID,
      } = req.body;
      var newService = await Service.create({
        name,
        price,
        image,
        description,
        available,     
      });
      await newService.addItem(itemID);
      return res.send("Servicio creado correctamente");
    } catch (error) {
      next(error);
    }
  });

   router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    Service
      .update(body, {
        where: {
          id,
        },
      })
      .then(() => {
        res.send('Servicio modificado correctamente');
      })
      .catch((error) => next(error));
  }); 


module.exports = router;
