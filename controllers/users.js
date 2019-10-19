const express = require('express');
const router = express.Router();
const db = require('./../models/db.js');

// Login Page
router.get('/login', (req, res) => res.render('Login', { title: "Login"}));
router.post('/login', function(req, res){
    
	var sql ="select * from login where username='"+req.body.uname+"' and password='"+req.body.pass+"'";
	db.getResults(sql, function(results){
		if(results.length > 0){
			if(results[0].type == 1)
			{
				req.session.uname = req.body.uname;
				req.session.status = 1;
				res.redirect('/admin/home/');
			}
			
		}else{
			res.send('invalid username/password');		
		}
    });
    
});
// Register Page
router.get('/register', (req, res) => res.render('Register', { title: "Register"}));

// Logout
router.get('/logout', (req, res) => res.send("logout"));

module.exports = router;