const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {getAsistentesByIdCliente,getAsistentesByIdSubasta,postAsistentes} = require('../controllers/asistentes.controller');
const router = Router();


router.get('/:idCliente',[check('idCliente').notEmpty(),validarCampos],getAsistentesByIdCliente)
router.get('/subasta/:idSubasta',[check('idSubasta').notEmpty(),validarCampos],getAsistentesByIdSubasta)
router.post('/asistentes',[check('cliente').notEmpty()
,check('subasta').notEmpty(),check('numeroPostor').notEmpty()
,validarCampos],postAsistentes)


module.exports = router