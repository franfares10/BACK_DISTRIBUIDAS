module.exports = (sequelize,type) => {
    return sequelize.define('itemsCatalogo',{

        idItemCatalogo:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        catalogo:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'catalogos',
                key:'idCatalogo'
            }
        },
        producto:{
            type:type.INTEGER,
            allowNull:false,
            references:{
                model:'productos',
                key:'idProducto'
            }
        },
        precioBase:{
            type:type.DOUBLE,
            allowNull:false
        },
        comision:type.FLOAT,
        subastado:{
            type:type.BOOLEAN,
            defaultValue:false,
            allowNull:false
        }
    })
}