const { Router } = require('express');
const { createRegistroDeSubasta,getRegistrosByIdCliente,getRegistrosByIdSubasta,getRegistroActual,getImporteMaximo,getUltimaPujaCliente } = require('../controllers/registroDeSubasta.controller');
const { check } = require('express-validator');

const router = Router();

router.post('/createRegistroDeSubasta', createRegistroDeSubasta);
router.get('/getImporteMaximo/:idSubasta/:idProducto',getImporteMaximo);
router.get('/getUltimaPujaCliente/:idCliente/:idSubasta/:idProducto',getUltimaPujaCliente);
router.get('/getRegistrosBySubasta/:idSubasta/:idCliente/:idProducto',getRegistrosByIdSubasta);
router.get('/getRegistrosByCliente/:id',getRegistrosByIdCliente);
router.get('/getRegistroActual/:idSubasta/:idProducto',getRegistroActual);

module.exports = router;