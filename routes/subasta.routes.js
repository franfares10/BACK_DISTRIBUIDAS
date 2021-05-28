const { Router } = require('express');
const { check } = require('express-validator');
const {getSubastas,createSubasta} = require('../controllers/subasta.controller');
//const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/getSubastas', getSubastas);

router.post('/createSubasta',createSubasta);

module.exports = router;