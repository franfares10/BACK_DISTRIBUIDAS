const { Router } = require('express');
const { check } = require('express-validator');
const {getSubastador} = require('../controllers/subastadores.controller');

const router = Router();

router.get('/getSubastadores/:id', getSubastador);

module.exports = router;