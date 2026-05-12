const jwt = require('jsonwebtoken');

JWT_SECRET = 'SECRET_KEY';

function generateToken (user) {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = {
  generateToken
};  