const {response} = require('express');
const { errorMonitor } = require('stream');
const {medioDePago} = require('../models/medioDePago')

const findMPbyId=async (req ,res = response)=>{
    let id = req.params.id;
    try{

        const pmResult = await medioDePago.findByPk(id);
    }catch(error){
        res.staut
    }
}

const findByCustomQuery = async (req,res = response)=>{
    const {cardNumber,idCliente,isValidated} = req.params.isValidated
    try{
        //Agregar logica  del where por la validacion distintos de verdadero
        const resultado= await medioDePago.findAll({where:
            {isValidated:isValidated,
            cardNumber: cardNumber,
            idCliente:idCliente
            }
        })
        res.status(201).json({
            ok:true,
            result:resultado,
            method: "findByCustomQuery"
        })
    }catch(error){
        res.status(500).json({
            errorOcurred:error,

        })
    }
}

const postMP= async (req, res = response)=>{
    const {cardNumber,expiryDate,CVV,country,isValidated,idCliente}=req.body;
    try{
        const pmPost = await medioDePago.create({
            cardNumber,
            expiryDate,
            CVV,
            country,
            isValidated,
            idCliente
        })
        res.status(201).json({
            ok:true,
            method:"postPaymentMethod",
            MedioDePago: pmPost
        })
    }catch(error){    
        res.status(500).json({
            errorOcurred:error,
            method: "postMP"
        })   
    }
}

const deletePM  = async (req, res = response)=>{
    let idBuscar = req.params.id
    try{
        let pmEncontrado=findMPbyId(idBuscar);
        if(pmEncontrado===undefined){
            res.status(401).json({
                error: 'No se encontraron medios de pago',
                method: 'deletePaymentMethod'
            })
        }
        let borrarCard = await medioDePago.destroy({
            where:{
                cardNumber: pmEncontrado.cardNumber
            }
        })
        res.status(200).json({
            message:"Medio de pago borrado correctamente",
            method: 'deletePaymentMethod'
        })
    }catch(error){
        res.status(400).json({
            errorOcurred: error,
            method: 'deletePM'
        })
    }
}


const updatePm = async (req, res = response)=>{
    let cardId = req.params.id
    try{
        if(cardId!==undefined){
            let cardEncontrada = await medioDePago.findByPk(cardId);
            let updatedVariable = await medioDePago.update(
                {isValidated:true},{where:
                    {
                        idCliente:cardEncontrada.idCliente,
                        cardNumber: cardEncontrada.cardNumber
                    }
                }
            )
            res.status(200).json({
                message:"Medio de pago actualizado",
                method: "updatedPaymentMethod",
                objeto: updatedVariable

            })
        }
        res.status(400).json({
            message:"No se pudo actualizar el medio de pago",
            method: "updatedPaymentMethod"
        })
    }catch(error){
        res.status(500).json({
            message:error,
            method: "updatedPaymentMethod"
        })
    }
}

module.exports = {
    findMPbyId,
    deletePM,
    postMP,
    updatePm,
    findByCustomQuery

}