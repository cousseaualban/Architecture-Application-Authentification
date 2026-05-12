const express = require('express');

const app = express();

// ⚡ obligatoire en microservices
const PORT = process.env.PORT || 8001;

app.get('/health', (req, res) => {
  res.send('Login service OK');
});

app.listen(PORT, () => {
  console.log(`Login running on ${PORT}`);
});