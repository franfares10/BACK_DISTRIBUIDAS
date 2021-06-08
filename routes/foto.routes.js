const { Router } = require('express');
const { createFoto, getFotosByProducto, generarFotoPorId, createFotoWithBase64 } = require('../controllers/foto.controller');
const { check } = require('express-validator');
const upload = require('../storage/storage');

const router = Router();


router.post('/createFoto', upload.single('foto'), createFoto);

router.post('/createFotoWithBase64', createFotoWithBase64);

router.get('/getFotosByProducto/:id', getFotosByProducto);

module.exports = router;