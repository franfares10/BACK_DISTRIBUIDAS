const {response} = require('express');
const { restart } = require('nodemon');
const { errorMonitor } = require('stream');
const {MedioDePago} = require('../database/config')

const findMPbyId=async (req ,res = response)=>{
    let {idCliente,cardNumber} = req.params;
    //console.log(idCliente + "-"+cardNumber)
    try{
        const pmResult = await MedioDePago.findAll({where:{
            idCliente:idCliente,
            cardNumber: cardNumber
        }});
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

const getAllActivePM= async (idCliente)=>{
    try{
        const resultado = await MedioDePago.findAll({where:{
            idCliente: idCliente,
            isValidated:true
        }})
        return resultado;
    }catch(error){
        res.status(500).json({
            error
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
    const {idCliente} = req.params
    try{
        //Agregar logica  del where por la validacion distintos de verdadero
        const resultado= await MedioDePago.findAll({where:
            {isValidated:true,
            idCliente:idCliente
            }
        })
        res.status(200).json({
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
    let {idCliente,cardNumber} = req.params
    try{
        let pmEncontrado=findMPbyId(req);
        if(pmEncontrado===undefined){
            res.status(401).json({
                error: 'No se encontraron medios de pago',
                method: 'deletePaymentMethod'
            })
        }
        await MedioDePago.destroy({
            where:{
                cardNumber: cardNumber,
                idCliente: idCliente
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
    let {idCliente,cardNumber} = req.params
    let opcion = req.headers.opcion
    let updatedVariable;
    console.log("Los parametros son: "+idCliente,cardNumber,opcion)
    try{
        if(idCliente!==undefined){
            let cardEncontrada = await MedioDePago.findAll({where:{
                cardNumber:cardNumber,
                idCliente:idCliente
            }});
            switch (opcion){
                case 1:
                    //Actualiza de falso a true
                    updatedVariable = await MedioDePago.update(
                        {isValidated:true},{where:
                            {
                                idCliente:cardEncontrada.idCliente,
                                cardNumber: cardEncontrada.cardNumber
                            }
                        }
                    )
                case 2:
                    updatedVariable = await MedioDePago.update(
                        {isValidated:false},{where:
                            {
                                idCliente:cardEncontrada.idCliente,
                                cardNumber: cardEncontrada.cardNumber
                            }
                        }
                    )
            }
                res.status(200).json({
                    message:"Medio de pago actualizado",
                    method: "updatedPaymentMethod",
                    objeto: updatedVariable

                })            
            }
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
    findByCustomQuery,
    getAllActivePM

}