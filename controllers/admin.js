const express = require('express');
const router = express.Router();
const db = require('./../models/db.js');

router.get('/home', (req, res) => res.render('admin/admin_home', { title: "Admin | Dashboard", user: req.session.uname}));

module.exports = router;