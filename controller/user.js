const user = require('../models/user');
const bcrypt = require('bcrypt');
const role = require('../models/role');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, roleId } = req.body;

        const roleExist = await role.findById(roleId);

        if (!roleExist) {
            return res.status(400).json({
                message: "Role does not exist",
            });
        }

        const existingEmail = await user.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const existingMobile = await user.findOne({ mobileNumber });

        if (existingMobile) {
            return res.status(400).json({
                message: "Mobile number already exists",
            });
        }

        const hpass = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            name,
            email,
            password: hpass,
            mobileNumber,
            role: roleId,
        });

        return res.status(201).json({
            message: "User created",
            data: newUser,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await user.find().select('-password');

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.password) {
            req.body.password = await bcrypt.hash(
                req.body.password,
                10
            );
        }

        const updatedUser = await user.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await user.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
};