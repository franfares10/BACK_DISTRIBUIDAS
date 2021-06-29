const nodemailer = require("nodemailer");

const acceptedUser = (nombreCliente,otpCliente)=> {return `Bienvenido ${nombreCliente}, fuiste aceptado en BetFast. Inicia sesión con este código para continuar tu proceso de registro ${otpCliente}`;}

const notAcceptedUser =(nombreCliente)=> {return `Buen día ${nombreCliente}, lamentamos informarte que no fuiste aceptado en la aplicación BET-FAST. Si crees que hubo algún error comunicate con la empresa de manera directa.`;}

const mandarMail = async (caseCliente, mailCliente, otpCliente) => {
  let mailTransport = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    port: 25,
    service: "Gmail",
    auth: {
      user: process.env.mail,
      pass: process.env.passMail,
    },
  });
  try {
    switch (caseCliente) {
      case "ACEPTADO":
        let mailMandado = await mailTransport.sendMail({
          from: process.env.mail,
          to: mailCliente,
          subject: "BETFAST- AVISO DE REGISTRO",
          text: acceptedUser(),
          html: "<h1>BETFAST</h1>"
        });
        break;
      case "RECHAZADO":
        let mailMandado = await mailTransport.sendMail({
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
