const express = require('express');
const router = express.Router();
var managerModel = require('./../models/manager-model');
var empModel = require('./../models/emp-model');

router.get('/home', (req, res) => res.render('manager/manager_home', { title: "Manager | Dashboard", user: req.session.uname, mid: req.session.uid}));

router.get('/profile', function(req, res){
    if(req.session.uname == null)
	{
		res.redirect('/users/login');
	}

	//var id = req.session.uid;
	var id = 1;
	console.log(id)
	empModel.getById(id, function(result){
		if(!result){
            res.send('invalid');
		}else{
            res.render("manager/manager_profile", {title: "Profile", user : req.session.uname, userInfo: result});
		}
	});

	
});

module.exports = router;