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

module.exports = {
    getSubastador
}