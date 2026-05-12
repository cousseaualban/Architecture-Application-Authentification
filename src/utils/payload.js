const AppError = require('./AppError');
function validateLoginPayload(payload) {
  if (!payload.email || !payload.password) {
    throw new AppError('Email et mot de passe sont requis', 401);
  }

  if (typeof payload.email !== 'string' || typeof payload.password !== 'string') {
    throw new AppError('Email et mot de passe doivent être des chaînes de caractères', 401);
  }

  return {
    email: payload.email.trim(),
    password: payload.password,
  };
}

module.exports = {
  validateLoginPayload,
};