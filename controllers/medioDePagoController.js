const {response} = require('express');
const { restart } = require('nodemon');
const { errorMonitor } = require('stream');
const {MedioDePago} = require('../database/config')

const findMPbyId=async (req ,res = response)=>{
    let id = req.params.id;
    try{
        const pmResult = await MedioDePago.findByPk(id);
        res.status(200).json({
            pmEncontrado: pmResult,
            method:"findPMbyId"
        })
    }catch(error){
        res.status(500).json({
            errorOcurred:error,
            method: "findPMbyid"
        })
    }
}

const checkParamsBeforeInsert= async (cardNumber,idCliente)=>{
    try{
        const resultado = await MedioDePago.findAll({where:{
            cardNumber: cardNumber,
            idCliente: idCliente
        }})
        return resultado;
    }catch(error){
        res.status(500).json({
            error
        })
    }
}

const findByCustomQuery = async (req,res = response)=>{
    const {cardNumber,idCliente,isValidated} = req.params.isValidated
    try{
        //Agregar logica  del where por la validacion distintos de verdadero
        const resultado= await MedioDePago.findAll({where:
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
        const checkedParams = await checkParamsBeforeInsert(cardNumber,idCliente);
        console.log(checkedParams)
        if(checkedParams[0]===undefined){
            const pmPost = await MedioDePago.create({
                cardNumber,
                expiryDate,
                CVV,
                country,
                isValidated,
                idCliente
            })
            return res.status(201).json({
                ok:true,
                method:"postPaymentMethod",
                MedioDePago: pmPost
            })
        }
        return res.status(409).json({
            message: "Ya existe un medio de pago con ese numero asociado al cliente",
            metodo: "postPM"
        })
    }catch(error){    
        console.log(error)
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
        let borrarCard = await MedioDePago.destroy({
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
            let cardEncontrada = await MedioDePago.findByPk(cardId);
            let updatedVariable = await MedioDePago.update(
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