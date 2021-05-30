module.exports = (sequelize,type) => {
    return sequelize.define('subastadores',{
        identificador:{
            type: type.INTEGER,
            primaryKey: true,
            references:{
                model:'personas',
                key:'identificador'
            }
        },
        matricula:{
            type:type.STRING,
            allowNull:false
        },
        region:{
            type:type.STRING,
            allowNull:false
        }
    });

}