const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { createUserValidator } = require('../validators/user');
const validateInput = require('../validators/validateInput');

router.post('/create', createUserValidator, validateInput, userController.createUser);

router.get('/get', userController.getUsers);

router.put('/update/:id', userController.updateUser);

router.patch('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

module.exports = router;