const { response } = require("express");
const {RegistroDeSubasta} = require('../database/config');

const createRegistroDeSubasta = async(req, res = response) =>{
    const {subasta,duenio,producto,cliente,importe,comision} = req.body;
    try{
        const registro = await RegistroDeSubasta.create({
            subasta,
            duenio,
            producto,
            cliente,
            importe,
            comision
        })
        res.json({
			ok: true,
			method: 'createRegistroDeSubasta',
			nuevoRegistro: registro
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'createRegistroDeSubasta',
			msg: 'An unexpected error has occurred.'
		});
    }
}

const getRegistrosByIdSubasta = async (req,res = response) =>{
    const {id} = req.params;

    try{
        const listaDeRegistros = await RegistroDeSubasta.findAll({
            where:{
                subasta:id
            }
        })

        res.json({
			ok: true,
			method: 'getRegistrosByIdSubasta',
			listaPujasDeSubasta: listaDeRegistros
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'getRegistrosByIdSubasta',
			msg: 'An unexpected error has occurred.'
		});
    }
}

const getRegistrosByIdCliente = async (req,res = response) =>{
    const {id} = req.params;

    try{
        const listaDeRegistros = await RegistroDeSubasta.findAll({
            where:{
                cliente:id
            }
        })

        res.json({
			ok: true,
			method: 'getRegistrosByIdCliente',
			listaPujasDeCliente: listaDeRegistros
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'getRegistrosByIdCliente',
			msg: 'An unexpected error has occurred.'
		});
    }
}


module.exports = {
    createRegistroDeSubasta,
    getRegistrosByIdSubasta,
    getRegistrosByIdCliente
}