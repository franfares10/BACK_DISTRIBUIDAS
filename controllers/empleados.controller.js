const { errorMonitor } = require("events");
const { response } = require("express");
const { restart } = require("nodemon");
const { Empleados } = require("../database/config");

const getEmpleadoById = async (req, res = response) => {
  const { idEmpleado } = req.params;
  console.log("El id del empleado es: " + idEmpleado);
  try {
    const empleadoEncontrado = await Empleados.findByPk(idEmpleado);
    res.status(200).json({
      ok: true,
      method: "getEmpleadoBy",
      empleado: empleadoEncontrado,
    });
  } catch (error) {
    console.log("Error"+error);
    res.status(500).json({
      errorOcurred: error,
      method: "getEmpleadoById",
    });
  }
}

const getAllEmpleados = async (req, res = response) => {
  console.log("El req que llega es:"+req);
  try {
    const listaEmpleados = await Empleados.findAll();
    res.status(200).json({
      ok: true,
      method:'getAllEmpleados',
      empleados: listaEmpleados
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorOcurred: error,
      method: "getAllEmpleados",
    });
  }
}

const postEmpleados = async (req, res = response) => {
  const { cargo, sector } = req.body;
  console.log("Los params que llegan para la creacion:"+cargo+sector)
  try {
    const empleadoGenerado = await Empleados.create({
      cargo,
      sector,
    });
    res.status(201).json({
      ok: true,
      empleado: empleadoGenerado,
    });
  } catch (error) {
    res.status(500).json({
      errorOcurred: error,
      method: "postEmpleados",
    });
  }
};

module.exports = {
  postEmpleados,
  getAllEmpleados,
  getEmpleadoById
};
