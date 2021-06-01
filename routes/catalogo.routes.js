const { Router } = require('express');
const { getCatalogoById, createCatalogo } = require('../controllers/catalogo.controller');
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/getCatalogos', getCatalogoById);

router.post('/createCatalogo',
    [
    check('idSubasta').not().isEmpty(),
    check('idResponsable').not().isEmpty()
    ]
    ,createCatalogo);

module.exports = router;