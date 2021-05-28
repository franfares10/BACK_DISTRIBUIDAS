const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {createDueño,updateDueño,findAllDueños,findDueñoById} = require('../controllers/dueños.controller');
const router = Router();


router.get('/:idDueño',[check('idDueño').notEmpty(),validarCampos],findDueñoById)
router.get('/',validarCampos,findAllDueños)
router.post('/dueños',[
                       check('numeroPais').notEmpty,
                       check('verificacionFinanciera').notEmpty(),
                       check('verificacionJudicial').notEmpty(),
                       check('calificacionRiesgo').notEmpty(),
                       check('verificador').notEmpty()
 ,validarCampos],createDueño)
router.put('/:idDueño',[check('idDueño').notEmpty(),validarCampos],updateDueño)


module.exports = router