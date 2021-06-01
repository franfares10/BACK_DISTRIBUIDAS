//identificador
//numeroPostor
//cliente
//subasta

const { DataTypes } = require("sequelize")

module.exports=(sequelize,type)=>{
    return sequelize.define('asistentes',{
        identificador:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement:true,
            unique:true
        },
        numeroPostor:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        cliente:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'clientes',
                key:'identificador'
            }
        },
        subasta:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'subastas',
                key:'idSubasta'
            }
        }
    })
}