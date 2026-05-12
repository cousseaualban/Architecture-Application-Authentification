function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || 'Erreur serveur',
  });
}

module.exports = errorHandler;
