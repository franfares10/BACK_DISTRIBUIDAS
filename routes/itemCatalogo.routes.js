const { Router } = require('express');
const { getCatalogoById, createCatalogo } = require('../controllers/catalogo.controller');
const { check } = require('express-validator');

