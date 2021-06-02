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
            
        },
        categoria:{
            type:type.STRING,
            allowNull:false
        },
        colorCategoria:{
            type:type.STRING,
            allowNull:false
        },
        estado:{
            type:type.STRING,
            allowNull:false
        }
    })
}