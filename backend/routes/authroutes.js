const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import the authController

// Define the login route
router.post('/login', authController.login); // POST /login route

// Define the register route
router.post('/signup', authController.signup); // POST /register route

// Export router for use in your app
module.exports = router;
