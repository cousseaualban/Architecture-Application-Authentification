const crypto = require('crypto');
const db = require('../config/database');

async function findByEmail(email) {
  const [rows] = await db.execute(
    'SELECT id, name, email, password_hash AS passwordHash, created_at AS createdAt FROM users WHERE email = ? LIMIT 1',
    [email.toLowerCase()],
  );

  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await db.execute(
    'SELECT id, name, email, password_hash AS passwordHash, created_at AS createdAt FROM users WHERE id = ? LIMIT 1',
    [id],
  );

  return rows[0] || null;
}

async function create(userData) {
  const id = crypto.randomUUID();

  await db.execute(
    'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)',
    [id, userData.name, userData.email.toLowerCase(), userData.passwordHash],
  );

  return findById(id);
}

module.exports = {
  findByEmail,
  findById,
  create,
};
