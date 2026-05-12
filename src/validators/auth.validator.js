const AppError = require('../utils/AppError');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegisterPayload(payload = {}) {
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';

  if (!name) {
    throw new AppError('Le nom est obligatoire', 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    throw new AppError('Adresse email invalide', 400);
  }

  if (password.length < 8) {
    throw new AppError('Le mot de passe doit contenir au moins 8 caracteres', 400);
  }

  return {
    name,
    email,
    password,
  };
}

module.exports = {
  validateRegisterPayload,
};
