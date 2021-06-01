module.exports = (sequelize,type) => {
    return sequelize.define('catalogos',{
       
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
        idResponsable:{
            type: type.INTEGER,
            allowNull:false,
            references:{
                model: 'personas',
                key:'identificador'
            }
        }
    });

}