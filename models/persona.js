module.exports = (sequelize, type) => {
	return sequelize.define('persona', {
		identificador: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull:false
		},
		documento: type.STRING,
		nombre: type.STRING,
		apellido: type.STRING,
		fechaNacimiento: type.STRING,
		direccion: type.STRING,
		estado: type.STRING,
		foto: type.STRING,
		dni: type.STRING
	});
}