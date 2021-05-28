const { response } = require('express')
const {Dueños} = require('../database/config')


const CALIFICACION_RIESGO = "calificacionRiesgo"
const VERIFICACION_JUDICIAL = "verificacionJudicial"
const VERIFICACION_FINANCIERA = "verificacionFinanciera"

const findDueñoById=async (req,res=response)=>{
    const {identificador} = req.params
    try{
        const result = await Dueños.findByPk(identificador);
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
    try{
        const resultadoList = await Dueños.findAll();
        res.status(200).json({
            dueños: resultadoList,
            method: 'findAllDueños'
        })
        return resultadoList;
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
        const postResutl = await Dueños.findOrCreate({where:{
            identificador : ''
        }},{
            numeroPais,
            verificacionFinanciera,
            verificacionJudicial,
            calificacionRiesgo,
            verificador
        });
        res.status(201).json({
            ok:true,
            method: 'createDueño',
            objetoCreaod: postResutl
        })
    }catch(error){
        res.status(500).json({
            errorOcurred: error,
            method:'postDueño'
        })
    }
}

const updateDueño =async (req,res = response)=>{
    const {idDueño} = req.params
    const {propActualizar,valorActualizar} = req.query
    //Tengo que verificar que se esté actualizando el dueño por esa propiedad.
    const updateBuilder={}
    switch (propActualizar){
        case CALIFICACION_RIESGO:
            updateBuilder = {
                calificacionRiesgo : valorActualizar
            }
            break;
        case VERIFICACION_FINANCIERA:
            updateBuilder={
                verificacionFinanciera:valorActualizar
            }
            break;
        case VERIFICACION_JUDICIAL:
            updateBuilder = {
                verificacionJudicial: valorActualizar
            }
            break;
    }
    try{
        const objetoEncontrado = await Dueños.findByPk(idDueño);
        const dueñoActualizado = await Dueños.update(updateBuilder,{
            where:{
                identificador : objetoEncontrado.identificador
            }
        })
        res.status(200).json({
            ok:true,
            method:'updateDueño',
            objetoActualizado:dueñoActualizado
        })
    }catch(error){
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