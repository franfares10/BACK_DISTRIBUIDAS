module.exports = (sequelize,type) =>{
    return sequelize.define('subastas',{

        idSubasta:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        fecha:{
            type: type.DATE,
            allowNull:false
        },
        id_subastador:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model: 'personas',
                key:'identificador'
            }
        },
        categoria:{
            type:type.STRING,
            allowNull:false
        },
        estado:{
            type:type.STRING,
            allowNull:false
        }
    })
}