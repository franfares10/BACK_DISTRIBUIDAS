const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const { subirDocumentosDigitales } = require("../controllers/cloudinary.controllers")
const router = Router();

router.post('/uploadCloudinary', subirDocumentosDigitales)

module.exports = router
