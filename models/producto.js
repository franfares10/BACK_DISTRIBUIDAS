module.exports = (sequelize,type) =>{
    return sequelize.define('productos',{
        idProducto:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        fecha:{
            type:type.DATE
        },
        disponible:{
            type: type.BOOLEAN,
            allowNull:false
        },
        descripcion:{
            type: type.STRING,
            allowNull:false
        },
        id_revisor:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'personas',
                key:'identificador'
            }
        },
        id_duenio:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:'personas',
                key:'identificador'
            }
        }
    })
}