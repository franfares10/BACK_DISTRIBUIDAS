const { Router } = require('express');
const { getProductoById, createProducto,getProductosByDuenio,updateEstadoProducto} = require('../controllers/producto.controller');
const { check } = require('express-validator');

const router = Router();

router.get('/getProductosByDuenio/:id',getProductosByDuenio);
router.get('/:id',getProductoById);
router.post('/createProducto',createProducto);
router.put('/updateEstadoProducto/:id',updateEstadoProducto);

module.exports = router;