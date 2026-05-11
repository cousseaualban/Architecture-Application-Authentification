const express = require('express');

const app = express();
const PORT = 3000;

// route principale
app.get('/', (req, res) => {
  res.send('Hello Express 🚀');
});

// démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});