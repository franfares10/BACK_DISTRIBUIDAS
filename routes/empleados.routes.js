const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {postEmpleados,getAllEmpleados,getEmpleadoById} = require('../controllers/empleados.controller');
const router = Router();


router.get('/:idEmpleado',[check('idEmpleado').notEmpty(),validarCampos],getEmpleadoById)
//router.get('/empleados/',[validarCampos],getAllEmpleados)
router.post('/empleados',[check('cargo').notEmpty(),check('sector').notEmpty(),validarCampos],postEmpleados).get(getAllEmpleados)


module.exports = router