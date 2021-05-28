const Sequelize = require('sequelize');

const PersonaModel = require('../models/persona');
const medioDePagoModel = require('../models/medioDePago')
const catalogoModel = require('../models/catalogo');
const subastaModel = require('../models/subasta');
const itemCatalogoModel = require('../models/itemCatalogo');
const productoModel = require('../models/producto');
const registroDeSubastaModel = require('../models/registroDeSubasta');
const fotoModel = require('../models/foto');

const sequelize = new Sequelize(`dywm8g83d72lqe2f`, 'j5gmdrbbpderlaut', 'rrz727k9h972m59m', {
	host: 'bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	dialect: 'mysql'
});

const Persona = PersonaModel(sequelize, Sequelize);
const MedioDePago = medioDePagoModel(sequelize,Sequelize)
const Catalogo = catalogoModel(sequelize,Sequelize);
const Subasta = subastaModel(sequelize,Sequelize);
const ItemCatalogo = itemCatalogoModel(sequelize,Sequelize);
const Producto = productoModel(sequelize,Sequelize);
const RegistroDeSubasta = registroDeSubastaModel(sequelize,Sequelize);
const Foto = fotoModel(sequelize,Sequelize);

sequelize.sync({ force: false })
	.then(() => {
		console.log("All models were synchronized successfully.");
	})
	.catch(err => {
		console.log(err);
	});

module.exports = {
	Persona,
	MedioDePago,
	Catalogo,
	Subasta,
	ItemCatalogo,
	Producto,
	RegistroDeSubasta,
	Foto,
	sequelize
};