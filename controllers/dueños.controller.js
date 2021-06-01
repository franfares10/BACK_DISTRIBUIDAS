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
    console.log(req.url.substring(idDuenio.length+1))
    let variablesActualizar=req.url.substring(idDuenio.length+1).replace("?","").split("&")
    let longitud = variablesActualizar.length
    console.log("Length de la lista"+longitud)
    console.log("Lista:"+variablesActualizar)
    const propActualizar = req.query.calificacionRiesgo //Acá hay un pequeño problem
    console.log("El query param que llega es:"+propActualizar)
    //Tengo que verificar que se esté actualizando el dueño por esa propiedad.
    let updateBuilder=""
    let mandarUpdate;
    switch (longitud){
        case 1:
            let obj = variablesActualizar[0].split("=")
            let objProperty = obj[0]
            let objValue = obj[1]
            updateBuilder = {
                objProperty: objValue
            }
            break;
        case 2:
            updateBuilder="{"
            variablesActualizar.forEach(element=>{
                let obj = element.split("=")
                let objProperty = obj[0]
                let objValue = obj[1]
                updateBuilder+=objProperty+":"+objValue+","
                //console.log("UPDATE BUILDER ="+updateBuilder)
                //Despues le hago el JSON.parse()
            })
            console.log("CASE 2"+updateBuilder.substring(0,updateBuilder.length-1).concat("}"))
            mandarUpdate=updateBuilder.substring(0,updateBuilder.length-1).concat("}")
            console.log("Mandar update "+mandarUpdate)
            //console.log("aca ibv"+updateBuilder.substring(0,updateBuilder.length-1).concat("}"))
            //updateBuilder+="}"
            break;
        case 3:
            updateBuilder="{"
            variablesActualizar.forEach(element=>{
                let obj = element.split("=")
                let objProperty = obj[0]
                let objValue = obj[1]
                updateBuilder+=updateBuilder+objProperty+":"+objValue+","
                console.log("UPDATE BUILDER ="+updateBuilder)
                //Despues le hago el JSON.parse()
            })
            
            mandarUpdate=updateBuilder.substring(0,updateBuilder.length-1).concat("}")
            break;
    }
    try{
        const objetoEncontrado = await Dueños.findByPk(idDuenio);
        console.log("El objeto que llega es: "+objetoEncontrado.identificador)
        //console.log("Update builder "+JSON.parse(JSON.stringify(updateBuilder)))
        //console.log("OBJETO QUE FORMA"+JSON.parse(JSON.stringify(updateBuilder)))
        console.log("Manda:"+mandarUpdate)
        {calificacionRiesgo:5}
        //Pasarlo por body para actualizar los cosos.
        const dueñoActualizado = await Dueños.update({mandarUpdate},{
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