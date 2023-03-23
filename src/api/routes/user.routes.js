const express = require('express');
const {login, register, checkSession} = require('../controllers/user.controller');
const {isAuth} = require('../../middlewares/auth');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/checksession', [isAuth], checkSession);

module.exports = router;