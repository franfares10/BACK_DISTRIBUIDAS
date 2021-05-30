const { Router } = require('express');
const { check } = require('express-validator');
const {getSubastador, createSubastador} = require('../controllers/subastadores.controller');

const router = Router();

router.get('/getSubastadores/:id', getSubastador);

router.post('/createSubastador', createSubastador);

module.exports = router;