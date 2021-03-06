const { response } = require("express");
const {ItemCatalogo,Producto} = require('../database/config');

const getItemsCatalogoByCatalogoId = async(req, res = response) => {

    const {id} = req.params;
    try{
        const itemsCatalogo = await ItemCatalogo.findAll({
            where:{
                    catalogo:id
                }
        });
        res.json({
            ok: true,
			method: 'getItemsCatalogoByCatalogoId',
			itemsCatalogo
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'getItemsCatalogoByCatalogoId',
            msg: 'An unexpected error has occurred.'
        })
    }
}


const createItemCatalogo = async (req, res = response) => {
	const { catalogoIdCatalogo, productoIdProducto,precioBase,comision } = req.body;
	try {
		const itemCatalogo = await ItemCatalogo.create({
			catalogoIdCatalogo,
            productoIdProducto,
            precioBase,
            comision,
            subastado:false
		});
		res.json({
			ok: true,
			method: 'createItemCatalogo',
			nuevoItemCatalogo: itemCatalogo
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			method: 'createItemCatalogo',
			msg: 'An unexpected error has occurred.'
		});
	}
}

module.exports = {
    getItemsCatalogoByCatalogoId,
    createItemCatalogo
}