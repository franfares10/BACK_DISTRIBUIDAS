/*
    Endpoint: api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {
    getClienteById,
    contraseña,
    aprobar,
    login,
    solicitar
} = require('../controllers/cliente.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/getClienteById/:id',
    getClienteById
);

router.post('/solicitar',
    [
        check('name').not().isEmpty(),
        check('idPersona').not().isEmpty(),
        check('password').not().isEmpty(),
        check('mail').not().isEmpty(),
        validarCampos
    ],
    solicitar
);

router.post('/login',
    [
        check('mail').not().isEmpty(),
        check('password').not().isEmpty(),
        validarCampos
    ],
    login
);

router.put('/aprobar/:id',
    aprobar
);

router.put('/contrasenia',
    [
        check('mail').not().isEmpty(),
        check('password').not().isEmpty(),
    ],
    contraseña
);

module.exports = router;