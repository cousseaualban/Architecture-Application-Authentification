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

module.exports = {
  register,
};
