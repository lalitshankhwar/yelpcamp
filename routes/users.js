const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isLoggedIn, storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.get('/register', users.renderRegister);

router.get('/login', users.renderLogin);

router.post('/register', catchAsync(users.register));

router.post('/login', storeReturnTo, passport.authenticate('local', {
    failureFlash: true, failureRedirect: '/login'
}), users.login)

router.get('/logout', isLoggedIn, users.logout)

module.exports = router;