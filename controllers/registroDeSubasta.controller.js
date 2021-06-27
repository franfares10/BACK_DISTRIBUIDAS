
const { response } = require("express");
const {RegistroDeSubasta,sequelize} = require('../database/config');
const Sequelize = require('sequelize');

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
    const {idSubasta, idCliente, idProducto} = req.params;
    try{
        const listaDeRegistros = await RegistroDeSubasta.findAll({
            where:{
				cliente: idCliente,
				subasta: idSubasta,
				producto: idProducto
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

const getUltimaPujaCliente = async (req,res = response) =>{
    const {idCliente, idSubasta, idProducto} = req.params;
    try{
		const maximo = await RegistroDeSubasta.max('importe', {where:{
            cliente: idCliente,
			subasta: idSubasta,
			producto: idProducto
        }});
        res.json({
			ok: true,
			method: 'getUltimaPujaCliente',
			ultimaPuja: maximo
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'getUltimaPujaCliente',
			msg: 'An unexpected error has occurred.'
		});
    }
}

const getRegistroActual = async (req,res = response) =>{
    const {idSubasta,idProducto} = req.params;


    try{
        const maximo = await RegistroDeSubasta.max('importe', {where:{
            subasta:idSubasta,
            producto:idProducto
        }});
    
        res.json({
			ok: true,
			method: 'getRegistroActual',
			pujaActual: maximo
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'getRegistroActual',
			msg: 'An unexpected error has occurred.'
		});
    }
}
const getImporteMaximo = async (req,res = response) =>{
    const {idSubasta,idProducto} = req.params;
    try{
        const maximo = await RegistroDeSubasta.max('importe', {where:{
            subasta:idSubasta,
            producto:idProducto
        }});
    
        res.json({
			ok: true,
			method: 'getImporteMaximo',
			ultimaPuja: maximo
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'getImporteMaximo',
			msg: 'An unexpected error has occurred.'
		});
    }
}



module.exports = {
    createRegistroDeSubasta,
    getRegistrosByIdSubasta,
    getRegistrosByIdCliente,
    getRegistroActual,
	getUltimaPujaCliente,
	getImporteMaximo
}