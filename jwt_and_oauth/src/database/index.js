const bcrypt = require('bcryptjs');
const passport = require('passport');

const users = [];

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  } catch (error) {
    throw new Error(error);
  }
}

const isValidPassword = async (password, passwordToCompare) => {
  try {
    return await bcrypt.compare(passwordToCompare, password);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { users, hashPassword, isValidPassword };