const {response} = require("express");
const {Subasta} = require('../database/config');

const getSubastas = async(req, res = reponse) =>{
    try{
        const subastas = await Subasta.findAll({
			where:{
				estado:'Activa'
			}
		});
        res.json({
			ok: true,
			method: 'getSubastas',
			subastas
		});
    }catch(error){
        console.error(error);
        res.status(500).json({
			ok: false,
			method: 'getSubastas',
			msg: 'An unexpected error has occurred.'
		});
    }
}


const createSubasta = async (req, res = response) => {
	const { fecha, id_subastador,id_catalogo, categoria,estado } = req.body;
	try {
		console.log(fecha)
		console.log(id_subastador)
		const nuevaSubasta = await Subasta.create({
			fecha,
			id_subastador,
			id_catalogo,
			categoria,
			estado
		});
		res.json({
			ok: true,
			method: 'createSubasta',
			nuevaSubasta: nuevaSubasta
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			method: 'createSubasta',
			msg: 'An unexpected error has occurred.'
		});
	}
}

const updateEstadoSubasta = async (req, res = response)=>{

	const {id} = req.params;
    
    try{
        
		const subastaActualizada = await Subasta.update(
			{
				estado:"Inactiva"
			},
			{
				where:{
					idSubasta:id
				}
			}
		)
        res.status(200).json({
            message:"Estado de Subasta actualizado",
            method: "updateEstadoSubasta",
            objeto: subastaActualizada

        })            

    }catch(error){
        res.status(500).json({
            message:error,
            method: "updateEstadoSubasta"
        })
    }
}

module.exports = {
    getSubastas,
    createSubasta,
	updateEstadoSubasta
}