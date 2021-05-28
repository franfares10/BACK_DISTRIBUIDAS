const {DataTypes} = require("sequelize")
module.exports = (sequelize,type)=>{
	return sequelize.define('MediosDePago',
	{
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
			allowNull: false,
			primaryKey:true
		}
	}
	)
}

 