/*
    Endpoint: api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getPersona, createPersona } = require('../controllers/persona.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/getUsers',
    getPersona
);

router.post('/createUser',
    [
        // check('name').not().isEmpty(),
        // check('password').not().isEmpty(),
        // check('role').not().isEmpty(),
        // check('email').isEmail(),
        // validarCampos
    ],
    createPersona
);

module.exports = router;