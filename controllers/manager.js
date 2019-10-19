const express = require('express');
const router = express.Router();
const db = require('./../models/db.js');

router.get('/home', (req, res) => res.render('manager/manager_home', { title: "Manager | Dashboard", user: req.session.uname}));

module.exports = router;