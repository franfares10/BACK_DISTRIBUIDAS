const { response } = require('express')
const {Dueños} = require('../database/config')


const CALIFICACION_RIESGO = "calificacionRiesgo"
const VERIFICACION_JUDICIAL = "verificacionJudicial"
const VERIFICACION_FINANCIERA = "verificacionFinanciera"

const findDueñoById=async (req,res=response)=>{
    const {idDuenio} = req.params
    console.log("Llega:"+idDuenio)
    try{
        const result = await Dueños.findByPk(idDuenio);
        res.status(200).json({
            dueño: result,
            method: 'findDueñosById'
        })
        return result;
    }catch(error){
        console.log(error)
        res.status(500).json({
            errorOcurred: error,
            method: 'findDueñoById'
        })
        throw new Error("Error buscando al dueño por id")
    }
}

const findAllDueños= async (req,res = response)=>{
    console.log("Request:"+req)
    try{
        const resultadoList = await Dueños.findAll();
        res.status(200).json({
            dueños: resultadoList,
            method: 'findAllDueños'
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            errorOcurred: error,
            method: 'findDueñoById'
        })
        throw new Error("Error buscando todos los clientes")
    }
}

const createDueño=async(req,res = response)=>{
    const {numeroPais,verificacionFinanciera,verificacionJudicial,calificacionRiesgo,verificador} = req.body
    try{
        const postResutl = await Dueños.create({
            numeroPais,
            verificacionFinanciera,
            verificacionJudicial,
            calificacionRiesgo,
            verificador
        
        }
            
        );
        res.status(201).json({
            ok:true,
            method: 'createDueño',
            objetoCreaod: postResutl
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            errorOcurred: error,
            method:'postDueño'
        })
    }
}

const updateDueño =async (req,res = response)=>{
    const {idDuenio} = req.params
    console.log("Dueño--> "+idDuenio)
    try{
        const objetoEncontrado = await Dueños.findByPk(idDuenio);
        console.log("El objeto que llega es: "+objetoEncontrado)

        const dueñoActualizado = await Dueños.update(req.body,{
            where:{
                identificador : objetoEncontrado.identificador
            }
        })
        console.log("El objeto que actualiza es:"+dueñoActualizado)
        res.status(200).json({
            ok:true,
            method:'updateDueño',
            objetoActualizado:dueñoActualizado
        })
    }catch(error){
        console.log("El error que llega es:"+error)
        res.status(500).json({
            errorOcurred: error,
            method: 'updateDueño'
        })
    }
}


module.exports = {
    findAllDueños,
    createDueño,
    updateDueño,
    findDueñoById
}