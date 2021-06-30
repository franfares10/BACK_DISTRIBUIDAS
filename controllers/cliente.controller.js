const { response } = require("express");
const { Cliente } = require("../database/config");
const { Persona } = require("../database/config");
const { mandarMail } = require("../controllers/nodemailer.controller");

const getClienteById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    res.json({
      ok: true,
      method: "getCliente",
      cliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      method: "getCliente",
      msg: "An unexpected error has occurred.",
    });
  }
};

const login = async (req, res = response) => {
  const { mail, password } = req.body;
  console.log(mail + password);
  try {
    const cliente = await Cliente.findOne({ where: { mail: mail } });
    console.log(password !== cliente.password);
    console.log(password !== cliente.otpCliente);
    if (password != cliente.password && password != cliente.otpCliente) {
      res.status(401).json({
        ok: false,
        method: "login",
        msg: "El email o la contraseña son incorrectos.",
      });
    } else {
      console.log("Paso por aca");
      if (password == cliente.otpCliente) {
        return res.json({
          ok: true,
          method: "login",
          cliente,
          isOtp: true,
        });
      }
      res.json({
        ok: true,
        method: "login",
        cliente,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      method: "login",
      msg: "An unexpected error has occurred.",
    });
  }
};

const solicitar = async (req, res = response) => {
  const { password, mail, idPersona } = req.body;
  try {
    const cliente = await Cliente.create({
      password,
      mail,
      idCliente: idPersona,
      admitido: "No",
      categoria: "Oro",
    });
    res.json({
      ok: true,
      method: "solicitar",
      cliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      method: "solicitar",
      msg: "An unexpected error has occurred.",
    });
  }
};

const aprobar = async (req, res = response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      res.status(404).json({
        ok: false,
        method: "aprobar",
        msg: "No existe ese idCliente.",
      });
    }
    //cliente.admitido = "Si";
    let otpClienteNew = Math.random().toString(16).substring(2, 10);
	let updatedClient = await Cliente.update(
		{ admitido:"Si",otpCliente: otpClienteNew },
		{
		  where: {mail:cliente.mail},
		}
	  );
	updatedClient = await Cliente.findByPk(id);
    //await cliente.save();
    console.log(
      "El mail del cliente es: " +
        cliente.mail +
        " su otp es: " +
        otpClienteNew
    );
    await mandarMail("ACEPTADO", cliente.mail, otpClienteNew);
    //Acá en teoría al cliente le llega el mail.
    res.json({
      ok: true,
      method: "aprobar",
      updatedClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      method: "aprobar",
      msg: "An unexpected error has occurred.",
    });
  }
};

const contraseña = async (req, res = response) => {
  //Una vez que hace el login con esto y le manda el otp, acá le pego con esto.
  const { mail, new_password } = req.body;
  console.log("Password que le llega es:  " + new_password + " " + mail)
  try {
    const cliente = await Cliente.findOne({ where: { mail: mail } });
    console.log("El cliente encontrado fue: " + JSON.stringify(cliente));
    if (!cliente) {
      res.status(404).json({
        ok: false,
        method: "aprobar",
        msg: "No existe ese idCliente.",
      });
    }
    cliente.otpCliente = null;
    cliente.password = new_password;
    //Cancela el otp porque en este paso ya genero la contraseña propia.
    console.log("El cliente que guarda es: " + JSON.stringify(cliente));
    //await Cliente.update({where:{mail:cliente.mail},{password:new_password});
    await Cliente.update(
      { password:new_password,otpCliente:null },
      {
        where: {mail:cliente.mail},
      }
    );
    res.json({
      ok: true,
      method: "contraseña",
      cliente,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      method: "contraseña",
      msg: "An unexpected error has occurred.",
    });
  }
};

module.exports = {
  getClienteById,
  contraseña,
  aprobar,
  login,
  solicitar,
};
