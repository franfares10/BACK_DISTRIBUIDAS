const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const {subirDocumentosDigitales} = require("../controllers/cloudinary.controllers")
const router  = Router();

router.post("/uploadCloudinary",[check('base64').notEmpty(),validarCampos],subirDocumentosDigitales)

module.exports = router