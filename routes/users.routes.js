/*
    Endpoint: api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser, getMe } = require('../controllers/users.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get('/getUsers',
    getUsers
);

/**
 * devuelve la info del usuario
 */

router.post('/me',
    [
        check('email').isEmail()
    ],
    getMe);

router.delete('/deleteUser/:id',
    deleteUser
);

router.post('/createUser',
    [
        check('name').not().isEmpty(),
        check('password').not().isEmpty(),
        check('role').not().isEmpty(),
        check('email').isEmail(),
        validarCampos
    ],
    createUser
);

router.put('/updateUser/:id',
    [
        check('name').not().isEmpty(),
        check('role').not().isEmpty(),
        validarCampos
    ],
    updateUser
);


module.exports = router;