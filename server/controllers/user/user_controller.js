const userModel = require('../../models/user/user_model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.getUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
};

exports.createUser = async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await userModel.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    try {
        const updatedUser = await userModel.updateUser(userId, updatedUserData);
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await userModel.deleteUser(userId);
        res.json(deletedUser);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
};