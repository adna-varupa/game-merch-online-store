const User = require('../models/User'); // Import User model

// Create a new user (register)
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Korisničko ime već postoji.' });
        }

        // Create a new user
        const newUser = await User.create({ username, password });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Greška prilikom registracije:', error);
        return res.status(500).json({ message: 'Greška servera' });
    }
};

// Retrieve a user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Korisnik nije pronađen.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
        return res.status(500).json({ message: 'Greška servera' });
    }
};

// Retrieve all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
        return res.status(500).json({ message: 'Greška servera' });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Korisnik nije pronađen.' });
        }

        // Update user data
        user.username = username || user.username;
        user.password = password || user.password;
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error('Greška prilikom ažuriranja korisnika:', error);
        return res.status(500).json({ message: 'Greška servera' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Korisnik nije pronađen.' });
        }

        // Delete the user
        await user.destroy();

        return res.status(200).json({ message: 'Korisnik je uspješno obrisan.' });
    } catch (error) {
        console.error('Greška prilikom brisanja korisnika:', error);
        return res.status(500).json({ message: 'Greška servera' });
    }
};

module.exports = {
    register,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
