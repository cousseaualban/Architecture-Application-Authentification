const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const usersRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

// route principale
app.get('/', (req, res) => {
  res.send('Hello Express 🚀');
});

app.use(express.json());

app.use('/api', usersRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});