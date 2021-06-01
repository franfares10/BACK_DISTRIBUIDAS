const { Router } = require('express');
const {createFoto,getFotosByProducto,generarFotoPorId} = require('../controllers/foto.controller');
const { check } = require('express-validator');
const upload = require('../storage/storage');

const router = Router();


router.post('/createFoto',upload.single('foto'),createFoto);

router.get('/getFotosByProducto/:id',getFotosByProducto);

module.exports = router;