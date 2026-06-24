const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                version: existingUser.version
            },
            process.env.JWT_SECRET || 'Abcde@12345',
            {
                expiresIn: '1d'
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};