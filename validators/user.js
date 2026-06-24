const { body } = require('express-validator');

const createUserValidator = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .notEmpty()
        .withMessage('Email is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),

    body('name')
        .notEmpty()
        .withMessage('Name is required'),

    body('mobileNumber')
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile number must be 10 digits')
        .isNumeric()
        .withMessage('Mobile number must contain only numbers')
        .notEmpty()
        .withMessage('Mobile number is required'),

    body('roleId')
        .notEmpty()
        .withMessage('Role Id is required'),
];

module.exports = {
    createUserValidator,
};