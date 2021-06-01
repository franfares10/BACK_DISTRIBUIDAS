const { response } = require("express");
const {Catalogo, Subasta} = require('../database/config');

const getCatalogoById = async (req,res = response) => {

    
    try{
        const catalogo = await Catalogo.findAll({
			include: [{ all: true, nested: true }]

		});
        res.json({
            ok: true,
			method: 'getCatalogo',
			catalogo
        });

        }catch(error){
            console.error(error);
            res.status(500).json({
                ok: false,
                method: 'getCatalogo',
                msg: 'An unexpected error has occurred.'
            })
        }
}

const createCatalogo = async (req, res = response) => {
	const { idSubasta,descripcion, idResponsable } = req.body;
	try {
		const nuevoCatalogo = await Catalogo.create({
			idSubasta,
			descripcion,
			idResponsable
		});
		res.json({
			ok: true,
			method: 'createCatalogo',
			nuevoCatalogo: nuevoCatalogo
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'createCatalogo',
			msg: 'An unexpected error has occurred.'
		});
	}
}

module.exports = {
    getCatalogoById,
    createCatalogo
}
