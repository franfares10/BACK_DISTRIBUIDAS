const { response } = require("express");
const bcrypt = require('bcryptjs');
const Persona = require('../models/persona');

const getPersona = async (req, res = response) => {
    try {
        const users = await User.find();
        res.json({
            ok: true,
            method: 'getUsers',
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'getUsers',
            msg: 'An unexpected error has occurred.'
        });
    }
}

const createPersona = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        console.log('Hey')
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'createUser',
            msg: 'An unexpected error has occurred.'
        });
    }
}


module.exports = {
    getPersona,
    createPersona,
}