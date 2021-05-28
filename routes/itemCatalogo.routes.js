const { Router } = require('express');
const { getItemsCatalogoByCatalogoId,createItemCatalogo} = require('../controllers/itemCatalogo.controller');
const { check } = require('express-validator');

const router = Router();

router.get('/getItemsByCatalogo/:id',getItemsCatalogoByCatalogoId);

router.post('/createItemCatalogo',createItemCatalogo);

module.exports = router;