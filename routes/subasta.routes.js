const { Router } = require('express');
const { check } = require('express-validator');
const {getSubastas,createSubasta} = require('../controllers/subasta.controller');
//const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/getSubastas', getSubastas);

router.post('/createSubasta',[
    check('fecha').not().isEmpty(),
    check('subastador').not().isEmpty(),
    check('categoria').not().isEmpty(),
    check('estado').not().isEmpty(),
    check('idCatalogo').not().isEmpty()
],
createSubasta);

module.exports = router;