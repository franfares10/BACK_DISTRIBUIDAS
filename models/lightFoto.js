module.exports = (sequelize, type) =>{
    return sequelize.define('lightfotos', {
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
        referencia_url:{
            type: type.STRING
        }
    })
}