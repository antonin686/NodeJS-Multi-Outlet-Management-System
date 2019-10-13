const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => res.render('Login', { title: "Login"}));

// Register Page
router.get('/register', (req, res) => res.render('Register', { title: "Register"}));

module.exports = router;