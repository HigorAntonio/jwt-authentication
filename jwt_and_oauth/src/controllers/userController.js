const db = require('../database');

module.exports = {
  index: (req, res) => {
    const users = db.users;

    res.json(users);
  }
}