const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {createDueño,updateDueño,findAllDueños,findDueñoById} = require('../controllers/dueños.controller');
const router = Router();


//router.get('/duenios',validarCampos,findAllDueños)
router.get("/:idDuenio",[check('idDuenio').notEmpty(),validarCampos],findDueñoById)
router.post('/duenios',[
                       check('numeroPais').notEmpty(),
                       check('verificacionFinanciera').notEmpty(),
                       check('verificacionJudicial').notEmpty(),
                       check('calificacionRiesgo').notEmpty(),
                       check('verificador').notEmpty()
 ,validarCampos],createDueño)
router.put('/:idDuenio',[check('calificacionRiesgo').notEmpty(),
check('verificacionJudicial').notEmpty(),check('verificacionFinanciera').notEmpty()
,validarCampos],updateDueño)
//router.get("/acaFunciona",console.log("ACA ENTRO"))

module.exports = router