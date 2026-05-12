const userRepository = require('../repositories/user.repository');
const { hashPassword } = require('../utils/password');
const { validateRegisterPayload } = require('../validators/auth.validator');
const AppError = require('../utils/AppError');

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

module.exports = {
  register,
};
