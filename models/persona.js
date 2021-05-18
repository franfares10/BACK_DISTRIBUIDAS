module.exports = (sequelize, type) => {
	return sequelize.define('persona', {
		identificador: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		documento: type.STRING,
		nombre: type.STRING,
		direccion: type.STRING,
		estado: type.STRING,
		foto: type.STRING
	});
}
