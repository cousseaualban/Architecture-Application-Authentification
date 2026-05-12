const authService = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: 'Inscription reussie',
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const token = await authService.login(req.body);

    res.json({
      message: 'Connexion reussie',
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    res.json({
      message: 'Utilisateur connecte',
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me,
};
