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
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/users', require('./routes/users.routes'));
// app.use('/api/forms', require('./routes/forms.routes'));