const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const usersRoutes = require('./routes/users');
require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', usersRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur lance sur http://localhost:${PORT}`);
});
