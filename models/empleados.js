const { DataTypes } = require("sequelize")

module.exports=(sequelize,type)=>{
    return sequelize.define('empleados',{
        identificador:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        cargo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        sector:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}