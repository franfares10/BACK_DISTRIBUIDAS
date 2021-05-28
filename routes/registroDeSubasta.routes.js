const { Router } = require('express');
const { createRegistroDeSubasta,getRegistrosByIdCliente,getRegistrosByIdSubasta } = require('../controllers/registroDeSubasta.controller');
const { check } = require('express-validator');

const router = Router();

router.post('/createRegistroDeSubasta', createRegistroDeSubasta);

router.get('/getRegistrosBySubasta/:id',getRegistrosByIdSubasta);
router.get('/getRegistrosByCliente/:id',getRegistrosByIdCliente);

module.exports = router;