const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const { loginValidator } = require('../validators/auth');
const validateInput = require('../validators/validateInput');

router.post(
    '/login',
    loginValidator,
    validateInput,
    authController.login
);

module.exports = router;