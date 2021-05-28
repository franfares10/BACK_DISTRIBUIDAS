/*
    Endpoint: api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getPersonaById, createPersona } = require('../controllers/persona.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/getPersonaById/:id',
    getPersonaById
);

router.post('/createPersona',
    [
        check('nombre').not().isEmpty(),
        check('direccion').not().isEmpty(),
        check('documento').not().isEmpty(),
        check('foto').not().isEmpty(),
        validarCampos
    ],
    createPersona
);

module.exports = router;