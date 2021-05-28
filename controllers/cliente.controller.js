const { response } = require("express");
const { Cliente } = require('../database/config');
const { Persona } = require('../database/config');

const getClienteById = async (req, res = response) => {
	const { id } = req.params;
	try {
		const cliente = await Cliente.findByPk(id);
		res.json({
			ok: true,
			method: 'getCliente',
			cliente
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'getCliente',
			msg: 'An unexpected error has occurred.'
		});
	}
}

const login = async (req, res = response) => {
	const { mail, password } = req.body;
	try {
		const cliente = await Cliente.findOne({ mail: mail });
		if (password !== cliente.password) {
			res.status(401).json({
				ok: false,
				method: 'login',
				msg: 'El email o la contraseña son incorrectos.'
			});
		} else {
			res.json({
				ok: true,
				method: 'login',
				cliente
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'login',
			msg: 'An unexpected error has occurred.'
		});
	}
}

const solicitar = async (req, res = response) => {
	const { password, mail, idPersona } = req.body;
	try {
		const cliente = await Cliente.create({
			password,
			mail,
			idCliente: idPersona,
			admitido: 'No',
			categoria: 'Oro',
		});
		res.json({
			ok: true,
			method: 'solicitar',
			cliente
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'solicitar',
			msg: 'An unexpected error has occurred.'
		});
	}
}

const aprobar = async (req, res = response) => {
	const { id } = req.params;
	console.log(id);
	try {
		const cliente = await Cliente.findByPk(id);
		if (!cliente) {
			res.status(404).json({
				ok: false,
				method: 'aprobar',
				msg: 'No existe ese idCliente.'
			});
		} 
		cliente.admitido = 'Si';
		await cliente.save();
		res.json({
			ok: true,
			method: 'aprobar',
			cliente
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'aprobar',
			msg: 'An unexpected error has occurred.'
		});
	}
}

const contraseña = async (req, res = response) => {
	const { mail, new_password } = req.body;
	try {
		const cliente = await Cliente.findOne({ mail: mail });
		if (!cliente) {
			res.status(404).json({
				ok: false,
				method: 'aprobar',
				msg: 'No existe ese idCliente.'
			});
		} 
		cliente.password = new_password;
		await cliente.save();
		res.json({
			ok: true,
			method: 'contraseña',
			cliente
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			method: 'contraseña',
			msg: 'An unexpected error has occurred.'
		});
	}
}


module.exports = {
	getClienteById,
	contraseña,
	aprobar,
	login,
	solicitar
}