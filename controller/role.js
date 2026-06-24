const role = require('../models/role');

exports.createRole = async (req, res) => {
    try{
        const { name, description } = req.body;
        const existingRole = await role.findOne({ name: name });
        if(existingRole){
            return res.status(400).json({
                message: "Role already exists",
            });
        }
        const newRole = await role.create({
            name,
            description,
        });

        return res.status(201).json({
            message: "Role created",
            data: newRole,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }        
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await role.find();
        return res.status(200).json({
            message: "Roles retrived successfully",
            data: roles,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Server error",
        });        
    }
};