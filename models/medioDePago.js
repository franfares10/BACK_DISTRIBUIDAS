const {Sequelize,Model,DataTypes} = require("sequelize");
const {sequelize} = require('../database/config');


class medioDePago extends Model{
     /*
		{
			“cardNumber:String,
			“expiryDate”: String,
			“CVV”:String,
			“country”: String,
			“isValidated”:Boolean,
			“idCliente”:String
		}
     */ 
}
console.log(sequelize)
medioDePago.init({
    cardNumber:{
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey:true,
		unique:true
	},
	expiryDate: {
		type: DataTypes.STRING,
		allowNull: false
	},
	CVV:{
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	country:{
		type: DataTypes.STRING,
		allowNull: false
	},
	isValidated:{
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	idCliente: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	sequelize:sequelize,
	modelName:"MedioDePago"
})


console.log("Comparacion:" +medioDePago===sequelize.models.medioDePago)

module.exports = {
	medioDePago
}
 