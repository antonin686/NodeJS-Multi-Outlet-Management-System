const express = require('express');
const router = express.Router();
const db = require('./../models/db.js');
var managerModel = require('./../models/manager-model');

router.get('/home', (req, res) => res.render('manager/manager_home', { title: "Manager | Dashboard", user: req.session.uname, mid: req.session.uid}));

//router.get('/profile/:id', (req, res) => res.render('manager/manager_profile', { title: "Profile", user: req.session.uname, mid: req.session.uid}));

router.get('/profile', function(req, res){
    if(req.session.uname == null)
	{
		res.redirect('/users/login');
	}
	var id = req.session.uid;
	managerModel.getById(id, function(result){
		if(!result){
            res.send('invalid');
		}else{
            res.render("manager/manager_profile", {title: "Profile", user : req.session.uname, userInfo: result});
		}
	});

	
});

module.exports = router;