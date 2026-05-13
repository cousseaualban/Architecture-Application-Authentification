const jwt = require('jsonwebtoken');

JWT_SECRET = 'SECRET_KEY';

function generateToken (user) {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};  