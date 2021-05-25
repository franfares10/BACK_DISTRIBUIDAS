// Required imports
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

// Express
const app = express();

// CORS & Environment
app.use(cors());

// Request's Body parsing
app.use(express.json());

// Default GET method
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Welcome to Aplicaciones Distribuidas Backend',
    });
});

// Database
require('./database/config');

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Paths
app.use('/api/personas', require('./routes/persona.routes'));
app.use('/api/mediosdepago',require('./routes/medioDePago.routes'))
app.use('/api/catalogos',require('./routes/catalogo.routes'))
app.use('/api/subastas',require('./routes/subasta.routes'));
//app.use('/api(itemsCatalogo',require('./routes/itemCatalogo.routes'));

// Listening port
app.listen(process.env.PORT, () => {
    console.log('Example app listening on port ' + process.env.PORT);
});