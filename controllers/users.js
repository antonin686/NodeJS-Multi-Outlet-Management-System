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
			if(results[0].type == 2)
			{
				req.session.uname = req.body.uname;
				req.session.status = 2;
				res.redirect('/manager/home/');
			}
			if(results[0].type == 3)
			{
				req.session.uname = req.body.uname;
				req.session.status = 3;
				res.redirect('/seller/seller_home/');
			}
			
		}else{
			res.send('invalid username/password');		
		}
    });
    
});
// Register Page
router.get('/register', (req, res) => res.render('Register', { title: "Register"}));

// Logout
router.get('/logout', (req, res) => res.render("logout"));

module.exports = router;