const crypto = require('crypto');

const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');

    crypto.pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, DIGEST, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(`${ITERATIONS}:${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

function comparePasswords(password, storedHash) {
  return new Promise((resolve, reject) => {
    const [iterations, salt, hash] = storedHash.split(':');
    crypto.pbkdf2(password, salt, parseInt(iterations), KEY_LENGTH, DIGEST, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      
      resolve(derivedKey.toString('hex') === hash);
    });
  });
}

module.exports = {
  hashPassword,
  comparePasswords,
};
