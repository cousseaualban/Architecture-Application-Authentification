const userRepository = require('../repositories/user.repository');
const { hashPassword, comparePasswords } = require('../utils/password');
const { validateRegisterPayload } = require('../validators/auth.validator');
const AppError = require('../utils/AppError');
const { validateLoginPayload } = require('../utils/payload');
const { generateToken } = require('../utils/token');

async function register(payload) {
  const data = validateRegisterPayload(payload);
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new AppError('Cette adresse email est deja utilisee', 409);
  }

  const passwordHash = await hashPassword(data.password);
  const user = await userRepository.create({
    name: data.name,
    email: data.email,
    passwordHash,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

async function login(payload) {
  const data = validateLoginPayload(payload);
  const user = await userRepository.findByEmail(data.email);

  if (!user) {
    throw new AppError('Email ou mot de passe incorrect', 401);
  }

  const isPasswordValid = await comparePasswords(data.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError('Email ou mot de passe incorrect', 401);
  }

  const token = generateToken(user);

  return token;
}


module.exports = {
  register,
  login,
};
