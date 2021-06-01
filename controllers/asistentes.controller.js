const { response } = require('express')
const {Asistentes} = require('../database/config');


const getAsistentesByIdCliente= async (req, res = response)=>{
    const {idCliente} = req.params
    try{
        const asistentesList = await Asistentes.findAll({where:{
            cliente:idCliente
        }});
        console.log("Lista que trae:"+asistentesList)
        res.status(200).json({
            mensaje:'All Asistentes were fetched successfully',
            asistentes: asistentesList
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            mensaje:err,
            code:500,
            method:'getAsistentes'
        })
    }
}

const getAsistentesByIdSubasta= async (req,res= response)=>{
    const {idSubasta} = req.params
    try{
        const asistentesList = await Asistentes.findAll({where:{
            subasta:idSubasta
        }});
        res.status(200).json({
            mensaje:'All Asistentes were fetched successfully',
            asistentes: asistentesList
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            mensaje:err,
            code:500,
            method:'getAsistentes'
        })
    }
}

const postAsistentes = async(req, res=response)=>{
    const {numeroPostor,cliente,subasta} = req.body
    console.log(req.body)
    try{
        const asistentesList = await Asistentes.findOrCreate({where:{
            cliente:cliente,
            subasta:subasta,
            numeroPostor:numeroPostor
        }}
        );
        res.status(200).json({
            mensaje:'The specifc assistant was created',
            asistentes: asistentesList
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            mensaje:err,
            code:500,
            method:'getAsistentes'
        })
    }
}


module.exports = {
    postAsistentes,
    getAsistentesByIdCliente,
    getAsistentesByIdSubasta
}


