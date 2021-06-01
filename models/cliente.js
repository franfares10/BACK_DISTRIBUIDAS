module.exports = (sequelize, type) => {
	return sequelize.define('cliente', {
        idCliente: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull:false,
            references:{
                model: 'personas',
                key: 'identificador'
            }
        },
		admitido: type.STRING,
		categoria: type.STRING,
		mail: type.STRING,
		password: type.STRING
	});
}
