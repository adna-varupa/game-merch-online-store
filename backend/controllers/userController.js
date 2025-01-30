const User = require('../models/User'); // Import User model

// Create a new user (registration)
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Create a new user
        const newUser = await User.create({ username, password });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error during fetching user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error during fetching users:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user data
        user.username = username || user.username;
        user.password = password || user.password;
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error during updating user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Delete user
        await user.destroy();

        return res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        console.error('Error during deleting user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
