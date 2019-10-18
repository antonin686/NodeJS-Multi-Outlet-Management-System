const express = require('express');
const router = express.Router();

// welcome Page
router.get('/', (req, res) => res.render('welcome', {title: 'Welcome'}));

module.exports = router;