const { response } = require("express");
const {Producto} = require('../database/config');

const getProductoById = async(req, res = response) =>{
    const {id} = req.params;
    try{
        const producto = await Producto.findByPk(id);
        res.json({
            ok: true,
			method: 'getProductoById',
			producto
        });

        }catch(error){
            console.error(error);
            res.status(500).json({
                ok: false,
                method: 'getProductoById',
                msg: 'An unexpected error has occurred.'
            })
        }
    
}

const createProducto = async (req, res = response) => {
	const { fecha, disponible,descripcion,id_revisor,id_duenio } = req.body;
	try {
		const producto = await Producto.create({
			fecha,
            disponible,
            descripcion,
            id_revisor,
            id_duenio
		});
		res.json({
			ok: true,
			method: 'createProducto',
			nuevoProducto: producto
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'createProducto',
			msg: 'An unexpected error has occurred.'
		});
	}
}


module.exports = {
    getProductoById,
    createProducto
}