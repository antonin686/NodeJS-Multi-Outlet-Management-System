const express = require('express');
const router = express.Router();
const loginModel = require('./../models/login-model');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const xoauth2 = require('xoauth2');
// Login Page
router.get('/login', (req, res) => res.render('Login', { title: "Login"}));

router.post('/login', (req, res) => {

	var user = {
		username: req.body.uname,
		password: req.body.pass
	};

	loginModel.validate(user, (status) => {
		if(!status){
			res.send('invalid username/password');
		}else{
			//console.log(status);
			req.session.uname = req.body.uname;
			req.session.type = status.type;
			req.session.uid = status.login_ID;
			req.session.outID = status.outlet_ID;
			//console.log(status);
			//console.log(req.session.uid)
			if(status.type == 1) {
				res.redirect('/admin/home/');
			}else if(status.type == 2) {
				res.redirect('/manager/home/');
			}else if(status.type == 3) {
				res.redirect('/seller/home/');
			}		
		}
	});

});	
	
// Register Page
router.get('/register', (req, res) => res.render('Register', { title: "Register"}));

//mail page
router.get('/mail', (req, res) => res.render('mail', { title: "Email",msg:""}));

router.post('/send', (req, res) => {
	const output = `
	  <p>You have a new outlet registration request</p>
	  <h3>Contact Details</h3>
	  <ul>  
		<li>Name: ${req.body.name}</li>
		<li>Locaton: ${req.body.company}</li>
		<li>Email: ${req.body.email}</li>
		<li>Phone: ${req.body.phone}</li>
	  </ul>
	  <h3>Outlet Description</h3>
	  <p>${req.body.message}</p>
	`;
  
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: false,
		port: 25,
		auth: {
		  user: 'bondskrillex@gmail.com',
		  pass: 'randlekithortonn'
		},
		tls: {
		  rejectUnauthorized: false
		}
	  });
  
	// setup email data with unicode symbols
	let mailOptions = {
		from: '"New Outlet Request" <shihabpearce@gmail.com>', // sender address
		to: 's.rahman3443@gmail.com', // list of receivers
		subject: 'Outlet Request', // Subject line
		text: 'Hello world?', // plain text body
		html: output // html body
	};
  
	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);   
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		//console.log(transporter.options.host);
  
		res.render('mail', {msg:'Email has been sent', title: "Email"});
	});
	});

// Logout
router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;

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
    

