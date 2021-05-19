const { response } = require("express");
const bcrypt = require('bcryptjs');
const { Persona } = require('../database/config');

const getPersonaById = async (req, res = response) => {
	const { id } = req.params;
	try {
		const persona = await Persona.findByPk(id);
		res.json({
			ok: true,
			method: 'getPersona',
			persona
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'getPersona',
			msg: 'An unexpected error has occurred.'
		});
	}
}

const createPersona = async (req, res = response) => {
	const { documento, nombre, direccion, foto } = req.body;
	try {
		const nuevaPersona = await Persona.create({
			documento,
			nombre,
			direccion,
			estado: 'Aprobado',
			foto
		});
		res.json({
			ok: true,
			method: 'createPersona',
			nuevaPersona: nuevaPersona
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'createPersona',
			msg: 'An unexpected error has occurred.'
		});
	}
}


module.exports = {
	getPersonaById,
	createPersona,
}