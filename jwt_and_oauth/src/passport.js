require('dotenv/config');
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const db = require('./database');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
// const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET
}, async (payload, done) => {
  try {
    const user = db.users.find(user => user.id === payload.sub);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

passport.use(new localStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = db.users.find(user => user.email === email);

    if (!user) {
      return done(null, false);
    }

    const isMatch = await db.isValidPassword(user.password, password);

    if (!isMatch) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));