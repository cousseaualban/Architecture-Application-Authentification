require('dotenv').config();

const app = require('./src/app');
const PORT = process.env.PORT || 3000;

// démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur lance sur http://localhost:${PORT}`);
});
