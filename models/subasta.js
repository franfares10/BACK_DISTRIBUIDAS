const { Catalogo,Persona } = require("../database/config")

module.exports = (sequelize,type) =>{
    return sequelize.define('subasta',{

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
                model: Persona,
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
        },
        id_catalogo:{
            type:type.INTEGER,
            allowNull:false,
            references:{
                model: Catalogo,
                key:'idCatalogo'
            }
        }
    })
}