const { DataTypes, Sequelize } = require("sequelize")

module.exports = (sequelize, type) =>{
    return sequelize.define('fotos', {
        idFoto:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        idProducto:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'productos',
                key:'idProducto'
            }
        },
        foto:{
            type: Sequelize.BLOB('long')
        },
        referencia_url:{
            type: DataTypes.STRING
        }
    })
}