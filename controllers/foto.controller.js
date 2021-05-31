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


const generarFotoPorId=async (fotos)=>{
    try{
       
        var list = await fotos.map( foto =>{  
        const objeto=JSON.parse(JSON.stringify(foto))
        console.log(objeto.foto)
        //fs.writeFile("imagenGenerada.jpg",objeto.foto.data,'base64',function(error){console.log('error'+error)})
        var blob = new Buffer(objeto.foto.data,'binary').toString("base64");
        //console.log(blob)
        console.log(blob.length)
        return blob;
    })
    //console.log(list)
    return list;
    }catch(error){
        console.log(error)
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

        var resultado = await generarFotoPorId(fotos);
        //console.log(resultado)
        res.json({
            ok: true,
			method: 'getFotosByProducto',
			fotos:resultado
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