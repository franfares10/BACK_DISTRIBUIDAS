const {Persona,Subasta} = require('../database/config');

module.exports = (sequelize,type) => {
    return sequelize.define('catalogo',{
       
        idCatalogo:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        descripcion:{
            type:type.STRING,
            allowNull:true
        },
        id_subasta:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model:Subasta,
                key:'idSubasta'
            }
        },
        idesponsable:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model: Persona,
                key:'identificador'
            }
        }
    });

}