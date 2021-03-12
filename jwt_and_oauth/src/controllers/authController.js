require('dotenv/config');
const jwt = require('jsonwebtoken');
const db = require('../database');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

signToken = user => {
  return jwt.sign({
    iss: 'projectName',
    sub: user.id,
    iat: new Date().getTime(), // tempo atual
    exp: new Date().setDate(new Date().getDate() + 1) // tempo atual + 1 dia
  }, ACCESS_TOKEN_SECRET);
}

module.exports = {
  signUp: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email ou senha invalidos' });
    }

    const foundUser = db.users.find(user => user.email === email);
    if (foundUser) {
      return res.status(403).json({ error: 'Email em uso' });
    }

    const passwordHash = await db.hashPassword(password);
    const newUser = { id: new Date().getTime(), email, password: passwordHash };
    db.users.push(newUser);

    const token = signToken(newUser);

    res.json({ token });
  },

  signIn: (req, res) => {
    const token = signToken(req.user);
    res.json({ token });
  }
};