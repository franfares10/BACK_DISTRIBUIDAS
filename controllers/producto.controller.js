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

const getProductosByDuenio = async(req, res = response) =>{
    const {id} = req.params;
    try{
        const productos = await Producto.findAll({
            where:{
                    id_duenio:id
            }
        });
        res.json({
            ok: true,
			method: 'getProductosByDuenio',
			productos
        });

        }catch(error){
            console.error(error);
            res.status(500).json({
                ok: false,
                method: 'getProductosByDuenio',
                msg: 'An unexpected error has occurred.'
            })
        }
    
}

const createProducto = async (req, res = response) => {
	const { fecha, disponible,descripcion,descripcionLarga,id_revisor,id_duenio } = req.body;
	try {
		const producto = await Producto.create({
			fecha,
            disponible,
            descripcion,
            descripcionLarga,
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

const updateEstadoProducto = async (req, res = response)=>{

	const {id} = req.params;
    
    try{
        
		const productoActualizado = await Producto.update(
			{
				disponible:false
			},
			{
				where:{
					idProducto:id
				}
			}
		)
        res.status(200).json({
            message:"Estado del Producto actualizado",
            method: "updateEstadoProducto",
            objeto: productoActualizado

        })            

    }catch(error){
        res.status(500).json({
            message:error,
            method: "updateEstadoProducto"
        })
    }
}

module.exports = {
    getProductoById,
    createProducto,
    getProductosByDuenio,
    updateEstadoProducto
}