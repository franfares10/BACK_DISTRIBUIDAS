const {response} = require("express");
const {Subastadores} = require('../database/config');

const getSubastador = async(req, res = reponse) =>{
    const { id } = req.params;
    try{
        const subastador = await Subastadores.findByPk(id);
        if (!subastador){
            res.status(404).json({
                ok: false,
                method: 'getSubastador',
                msg: 'No se encontró subastador por ese id.'
            })
        }
        res.json({
			ok: true,
			method: 'getSubastador',
			subastador
		});
        }catch(error){
            console.error(error);
            res.status(500).json({
                ok: false,
                method: 'getSubastador',
                msg: 'An unexpected error has occurred.'
            });
        }
}

const createSubastador = async (req, res = response) => {
	const {identificador, matricula, region } = req.body;
	try {
		const nuevoSubastador = await Subastadores.create({
			identificador,
			matricula,
			region
		});
		res.json({
			ok: true,
			method: 'createSubastador',
			nuevoSubastador: nuevoSubastador
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'createSubastador',
			msg: 'An unexpected error has occurred.'
		});
	}
}

module.exports = {
    getSubastador,
    createSubastador
}