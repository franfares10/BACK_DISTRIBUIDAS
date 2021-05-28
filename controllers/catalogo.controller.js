const { response } = require("express");
const {Catalogo} = require('../database/config');

const getCatalogoById = async (req,res = response) => {

    const {id} = req.params;
    try{
        const catalogo = await Catalogo.findByPk(id);
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
	const { descripcion, idSubasta, idResponsable } = req.body;
	try {
		const nuevoCatalogo = await Catalogo.create({
			descripcion,
			idSubasta,
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
