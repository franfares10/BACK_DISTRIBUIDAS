
const {response} = require("express");
const {Subasta} = require('../database/config');
const fetch = require('node-fetch');

const {getItemsCatalogoByCatalogoId} = require('../controllers/itemCatalogo.controller')

const fillSubastas = ( async data =>{
	var list =[]
	data.map( async subasta =>{
		const res = await fetch(`https://distribuidas-backend.herokuapp.com/api/itemsCatalogo/getItemsByCatalogo/${subasta.id_catalogo}`, {
			method: 'GET',
		  });

		const productos = await res.json();
		  
		var dic = {
			subasta: subasta,
			productos: productos
		}
		list.push(dic);
	})

	return list;
}) 
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
				})

		var lista = []

		lista.push(subastas[0].dataValues)
		console.log(lista)
		const result =await fillSubastas(lista); 

		console.log(result)
		
		

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