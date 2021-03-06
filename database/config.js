const Sequelize = require('sequelize');

const PersonaModel = require('../models/persona');
const ClienteModel = require('../models/cliente');
const medioDePagoModel = require('../models/medioDePago')
const catalogoModel = require('../models/catalogo');
const subastaModel = require('../models/subasta');
const itemCatalogoModel = require('../models/itemCatalogo');
const productoModel = require('../models/producto');
const registroDeSubastaModel = require('../models/registroDeSubasta');
const subastadoresModel = require('../models/subastadores');
const fotoModel = require('../models/foto');
const dueñosModel = require('../models/dueños')
const asistentesModel = require('../models/asistentes')
const empleadosModel = require('../models/empleados')
const lightFotoModel = require('../models/lightFoto');

const sequelize = new Sequelize(`dywm8g83d72lqe2f`, 'j5gmdrbbpderlaut', 'uawlgdap34ljr4cw', {
	host: 'bmlx3df4ma7r1yh4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	dialect: 'mysql'
});

const Persona = PersonaModel(sequelize, Sequelize);
const Cliente = ClienteModel(sequelize, Sequelize);
const MedioDePago = medioDePagoModel(sequelize, Sequelize)
const Catalogo = catalogoModel(sequelize, Sequelize);
const Subasta = subastaModel(sequelize, Sequelize);
const ItemCatalogo = itemCatalogoModel(sequelize, Sequelize);
const Producto = productoModel(sequelize, Sequelize);
const RegistroDeSubasta = registroDeSubastaModel(sequelize, Sequelize);
const Subastadores = subastadoresModel(sequelize, Sequelize);
const Foto = fotoModel(sequelize, Sequelize);
const Dueños = dueñosModel(sequelize,Sequelize);
const Asistentes = asistentesModel(sequelize,Sequelize)
const Empleados = empleadosModel(sequelize,Sequelize)
const LightFoto = lightFotoModel(sequelize,Sequelize);

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
	Subastadores,
	Foto,
	Asistentes,
	Dueños,
	Empleados,
	LightFoto,
	Cliente,
	sequelize
};