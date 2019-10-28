const express = require('express');
const router = express.Router();
const loginModel = require('./../models/login-model');

// Login Page
router.get('/login', (req, res) => res.render('Login', { title: "Login"}));
router.post('/login', function(req, res){
    
	var user = {
		username: req.body.uname,
		password: req.body.pass
	};

	loginModel.validate(user, function(status){
		if(!status){
			res.send('invalid username/password');
		}else{		
			if(status == 1)
			{
				req.session.uname = req.body.uname;
				req.session.utype = 1;
				res.redirect('/admin/home');		
			}
			else if(status == 2)
			{
				res.redirect('/manager/home'); 
			}
			else if(status == 3)
			{
				res.redirect('');
			}
		}
	});
});
// Register Page
router.get('/register', (req, res) => res.render('Register', { title: "Register"}));

// Logout
router.get('/logout', (req, res) => res.render("logout"));

module.exports = router;