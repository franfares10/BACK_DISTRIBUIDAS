const {response} = require("express");
const {Subasta} = require('../database/config');

const getSubastas = async(req, res = reponse) =>{
    try{
        const subastas = await Subasta.findAll();
        res.json({
			ok: true,
			method: 'getSubastas',
			subastas
		});
    }catch(error){
        console.error(error);
        res.status(500).json({
			ok: false,
			method: 'getSubastas',
			msg: 'An unexpected error has occurred.'
		});
    }
}


const createSubasta = async (req, res = response) => {
	const { fecha, id_subastador, categoria,estado } = req.body;
	try {
		console.log(fecha)
		console.log(id_subastador)
		const nuevaSubasta = await Subasta.create({
			fecha,
			id_subastador,
			categoria,
			estado
		});
		res.json({
			ok: true,
			method: 'createSubasta',
			nuevaSubasta: nuevaSubasta
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			method: 'createSubasta',
			msg: 'An unexpected error has occurred.'
		});
	}
}


module.exports = {
    getSubastas,
    createSubasta
}