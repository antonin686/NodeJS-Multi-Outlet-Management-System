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
			//console.log(status);
			req.session.uname = req.body.uname;
			req.session.type = status.type;
			req.session.uid = status.id;
			console.log(status);
			if(status.type == 1)
			{
				res.redirect('/admin/home/');
			}else if(status.type == 2){
				res.redirect('/manager/home/');
			}else if(status.type == 3){
				res.redirect('/seller/seller_home/');
			}
				
		}
	});

});	
    
// 	var sql ="select * from users where username='"+req.body.uname+"' and password='"+req.body.pass+"'";
// 	db.getResults(sql, function(results){
// 		if(results.length > 0){
// 			if(results[0].type == 1)
// 			{
// 				req.session.uname = req.body.uname;
// 				req.session.status = 1;
// 				res.redirect('/admin/home/');
// 			}
// 			if(results[0].type == 2)
// 			{
// 				req.session.uname = req.body.uname;
// 				req.session.status = 2;
// 				req.session.uid = results[0].id;
// 				//console.log(req.session.uid);
// 				//console.log(req.session.uname);
// 				res.redirect('/manager/home/');
// 			}
// 			if(results[0].type == 3)
// 			{
// 				req.session.uname = req.body.uname;
// 				req.session.status = 3;
// 				res.redirect('/seller/seller_home/');
// 			}
			
// 		}else{
// 			res.send('invalid username/password');		
// 		}
//     });
    

// Register Page
router.get('/register', (req, res) => res.render('Register', { title: "Register"}));

// Logout
router.get('/logout', (req, res) => res.render("logout"));

module.exports = router;