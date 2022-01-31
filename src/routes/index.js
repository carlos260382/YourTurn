const { Router } = require('express');
const router = Router();

//Importaciones de rutas
const userRoutes = require("./user");
const adminRoutes = require("./admin");
const turnRoutes = require("./turn");
const centerRoutes = require("./center");
const itemRoutes = require("./item");

//Rutas
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/turn', turnRoutes);
router.use('/center', centerRoutes);
router.use('/item', itemRoutes);


module.exports = router;


