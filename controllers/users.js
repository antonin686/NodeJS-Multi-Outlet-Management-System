const express = require('express');
const router = express.Router();
var db = require('./../models/db.js');
// Login Page
router.get('/login', (req, res) => res.render('Login', { title: "Login"}));
router.post('/login', function(req, res){
    
    var sql ="select * from login where username='"+req.body.uname+"' and password='"+req.body.pass+"'";
	db.getResults(sql, function(results){
		if(results.length > 0){
			
			res.redirect('/');
		}else{
			res.send('invalid username/password');		
		}
    });
    
});
// Register Page
router.get('/register', (req, res) => res.render('Register', { title: "Register"}));

module.exports = router;