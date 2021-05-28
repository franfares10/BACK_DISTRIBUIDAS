const { errorMonitor } = require("events");
const { response } = require("express");
const { restart } = require("nodemon");
const { Empleados } = require("../database/config");

const getEmpleadoById = async (req, res = response) => {
  const { idEmpleado } = req.params;
  try {
    const empleadoEncontrado = Empleados.findByPk(idEmpleado);
    res.status(200),
      json({
        ok: true,
        method: "getEmpleadoBy",
        empleado: empleadoEncontrado,
      });
  } catch (error) {
        res.status(500).json({
                errorOcurred: error,
                method:'getEmpleadoById'
        })
  }
};

const getAllEmpleados= async (req,res=response)=>{
        try{
                const listaEmpleados = Empleados.findAll();
                res.status(200).json({
                        ok:true,
                        empleados: listaEmpleados
                })
        }catch(error){
                res.status(500).json({
                        errorOcurred:error,
                        method:'getAllEmpleados'
                })
        }
}

const postEmpleados=(req,res=response)=>{
        const {cargo,sector}=req.params
        try{
                const empleadoGenerado = Empleados.create({
                        cargo,sector
                })
                res.status(201).json({
                        ok:true,
                        empleado:empleadoGenerado
                })
        }catch(error){
                res.status(500).json({
                        errorOcurred:error,
                        method:'postEmpleados'
                })
        }
}

module.exports={
        postEmpleados,
        getAllEmpleados,
        getEmpleadoById
}