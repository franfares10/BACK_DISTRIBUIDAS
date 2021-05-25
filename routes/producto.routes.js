const { Router } = require('express');
const { getProductoById, createProducto} = require('../controllers/producto.controller');
const { check } = require('express-validator');

const router = Router();

router.get('/:id',getProductoById);
router.post('/createProducto',createProducto);

module.exports = router;