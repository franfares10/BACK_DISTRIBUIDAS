const {DataTypes} = require('sequelize')
module.exports = (sequelize,type)=>{
    return sequelize.define('dueños',{
        identificador:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            primaryKey: true,
            autoIncrement:true,
            references:{
                model:'personas',
                key:'identificador'
            }
        },
        numeroPais:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:54
        },
        verificacionFinanciera:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'no',
            isIn:[['si'],['no']]
        },
        verificacionJudicial:{
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue:'no',
            isIn:[['si'],['no']]
        },
        calificacionRiesgo:{
            type:DataTypes.SMALLINT,
            allowNull:false,
            defaultValue:1,
            isIn:[[1],[2],[3],[4],[4],[5],[6]]
        },
        verificador:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
            references:{
                model: 'empleados', 
                key: 'identificador'
            }
        }
    })
}