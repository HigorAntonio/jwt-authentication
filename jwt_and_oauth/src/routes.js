const express = require('express');
const passport = require('passport');

const passportConf = require('./passport');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

const routes = express.Router();

routes.get('/users', passportJwt, userController.index);

routes.post('/signup', authController.signUp);
routes.post('/signin', passportSignIn, authController.signIn);

routes.get('/oauth/twitch', passport.authenticate('twitch', { session: false }));

module.exports = routes;