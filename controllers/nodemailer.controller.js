const nodemailer = require("nodemailer");

const acceptedUser = (otpCliente)=> {return `Bienvenido a BETFAST!, fuiste aceptado. Inicia sesión con este código para continuar tu proceso de registro ${otpCliente}`;}

const notAcceptedUser =(nombreCliente)=> {return `Buen día ${nombreCliente}, lamentamos informarte que no fuiste aceptado en la aplicación BET-FAST. Si crees que hubo algún error comunicate con la empresa de manera directa.`;}

const mandarMail = async (caseCliente, mailCliente, otpCliente) => {
  let mailTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    service: "gmail",
    auth: {
      user: process.env.mail,
      pass: process.env.passMail,
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  let mailMandado = "";
  try {
    switch (caseCliente) {
      case "ACEPTADO":
        mailMandado = await mailTransport.sendMail({
          from: process.env.mail,
          to: mailCliente,
          subject: "BETFAST- AVISO DE REGISTRO",
          html: "<h1>BETFAST</h1>"+acceptedUser(otpCliente)
        });
        break;
      case "RECHAZADO":
        mailMandado = await mailTransport.sendMail({
          from: "",
          to: mailCliente,
          subject: "BETFAST- AVISO DE REGISTRO",
          text: notAcceptedUser(),
          html: "<h1>BETFAST</h1>"
        });
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  mandarMail,
};
