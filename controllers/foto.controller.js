const { response, request } = require("express");
const { Foto,LightFoto } = require("../database/config");
const fs = require("fs");
const { subirDocumentosDigitales } = require("./cloudinary.controllers");
const path = require('path');
const nodeSchedule = require('node-schedule')

const createFoto = async (req, res = response) => {
  
  const { idProducto } = req.body;

  try {
    const fileName = "./storage/imgs/" + req.file.filename;
    console.log("fileName " + fileName);
    const nuevaFoto = await Foto.create({
      idProducto,
      foto: fs.readFileSync(fileName),
    });
    const nuevaLightFoto = await LightFoto.create({
      idProducto
    })
    const resultado = await subirDocumentosDigitales(fileName);
    //console.log("Public id" + resultado);
    //console.log("Nueva foto id:" + nuevaFoto.idFoto);
    //console.log("Nueva product id:" + nuevaFoto.idProducto);

    var imprimir = await updateFoto(resultado,nuevaFoto.idFoto,nuevaFoto.idProducto)
    var light = await updateFoto(resultado,nuevaLightFoto.idFoto,nuevaLightFoto.idProducto);
    
    res.json({
      ok: true,
      method: "createFoto",
      foto: nuevaFoto,
      foto_url: `http://localhost:3006/foto/${req.file.filename}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      method: "createFoto",
      msg: "An unexpected error has occurred.",
    });
  }
};

const updateFoto = async (resultado, idFoto, idProducto) => {
  if(resultado!==undefined && idFoto!==undefined && idProducto!==undefined){
    await LightFoto.update(
      { referencia_url: resultado },
      {
        where: {
          idFoto: idFoto,
          idProducto: idProducto,
          referencia_url: null,
        },
      }
    );
  }
  
};

const getFotosByProducto = async (req, res = response) => {
  const { id } = req.params;

  try {
    const fotos = await Foto.findAll({
      where: {
        idProducto: id,
      },
    });
    res.json({
      ok: true,
      method: "getFotosByProducto",
      fotos: fotos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      method: "getFotosByProducto",
      msg: "An unexpected error has occurred.",
    });
  }
};

const createFotoWithBase64 = async (req, res = response) => {
  const { idProducto, url } = req.body;
  try {
    const nuevaLightFoto = await LightFoto.create({
      idProducto,
      referencia_url: url
    });
    res.json({
      ok: true,
      method: "createFotoWithBase64",
      foto: nuevaLightFoto
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      method: "createFotoWithBase64",
      msg: "An unexpected error has occurred.",
    });
  }
}

const directory = './storage/imgs';
const scheduledJob=nodeSchedule.scheduleJob('30 * * * *',function borrar() {
  //Corre este proceso cuando son todos los y media de las horas
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  })
  console.log("EJECUTO EL PROCESO DE LIMPIEZA")
})



module.exports = {
  createFoto,
  getFotosByProducto,
  createFotoWithBase64
};
