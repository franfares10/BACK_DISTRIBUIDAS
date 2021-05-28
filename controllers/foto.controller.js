const { response } = require("express");
const {Foto} = require('../database/config');
const fs = require('fs');

const createFoto = async (req, res = response) =>{
    console.log(req.body)
    const {idProducto,foto} = req.body;
    
    try{
    const nuevaFoto = await Foto.create({
        idProducto,
        foto:fs.readFileSync(
            "./storage/imgs/" + req.file.filename
          )
    })
    res.json({
        ok: true,
        method: 'createFoto',
        foto: nuevaFoto,
        foto_url: `http://localhost:3006/foto/${req.file.filename}`
    });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'createFoto',
            msg: 'An unexpected error has occurred.'
        })
    }
}

const getFotosByProducto = async(req, res = response) =>{
    const {id} = req.params;

    try{
        const fotos = await Foto.findAll({
            where:{
                idProducto:id
            }
        })
        res.json({
            ok: true,
			method: 'getFotosByProducto',
			fotos:fotos
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            method: 'getFotosByProducto',
            msg: 'An unexpected error has occurred.'
        })
    }
}

module.exports = {
    createFoto,
    getFotosByProducto
}