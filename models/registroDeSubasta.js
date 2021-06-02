module.exports = (sequelize,type) => {
    return sequelize.define('registrosDeSubasta',{
        idRegistro:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        subasta:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'subastas',
                key:'idSubasta'
            }
        },
        duenio:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'personas',
                key:'identificador'
            }
        },
        producto:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'productos',
                key:'idProducto'
            }
        },
        cliente:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'personas',
                key:'identificador'
            }
        },
        importe:{
            type: type.DOUBLE,
            allowNull:false
        },
        comision:{
            type: type.FLOAT
        }
    })
}