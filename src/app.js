const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API authentification',
    endpoints: {
      inscription: 'POST /api/auth/register',
    },
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get('/health', (req, res) => {
  res.send('Login service OK');
});


app.use('/api/auth', authRoutes);
app.use(errorHandler);

module.exports = app;
