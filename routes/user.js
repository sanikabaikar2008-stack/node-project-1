const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { createUserValidator } = require('../validators/user');
const validateInput = require('../validators/validateInput');
const { checkAuth } = require('../middleware/checkAuth');

router.post('/create', createUserValidator, validateInput, userController.createUser);

router.get('/get', checkAuth, userController.getUsers);

router.put('/update/:id', checkAuth, userController.updateUser);

router.patch('/update/:id', checkAuth, userController.updateUser);

router.delete('/delete/:id', checkAuth, userController.deleteUser);

module.exports = router;