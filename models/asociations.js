const {Subasta,Catalogo, ItemCatalogo, Producto, Persona, LightFoto,Subastadores} = require("../database/config")


//Subasta.hasOne(Persona, {foreignKey: "identificador"})


Subasta.hasOne(Catalogo, {  foreignKey: "idSubasta" });


Catalogo.belongsToMany(Producto, { through: 'itemsCatalogo' });
Producto.belongsToMany(Catalogo, { through: 'itemsCatalogo' });
Producto.hasMany(LightFoto,{foreignKey:{name:'idProducto'}})


//Subastadores.belongsToMany(Subasta,{foreignKey:{name:'id_subastador'}})
//Producto.belongsTo(Persona,{foreignKey:{name:'id_duenio'}})
//Catalogo.belongsTo(Subasta, { foreignKey: "id_catalogo" });




