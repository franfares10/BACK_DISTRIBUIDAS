const Sequelize = require('sequelize');

const PersonaModel = require('../models/persona');
const medioDePagoModel = require('../models/medioDePago')

const sequelize = new Sequelize(`dywm8g83d72lqe2f`, 'j5gmdrbbpderlaut', 'rrz727k9h972m59m', {
	host: 'bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	dialect: 'mysql'
});

const Persona = PersonaModel(sequelize, Sequelize);
const MedioDePago = medioDePagoModel(sequelize,Sequelize)

sequelize.sync({ force: true })
	.then(() => {
		console.log("All models were synchronized successfully.");
	})
	.catch(err => {
		console.log(err);
	});

module.exports = {
	Persona,
	sequelize,
	MedioDePago
};