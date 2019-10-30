const express = require('express');
const router = express.Router();
var managerModel = require('./../models/manager-model');
var empModel = require('./../models/emp-model');
var outletModel = require('./../models/outlet-model');
const loginModel = require('../models/login-model');

router.get('*', function(req, res, next){

	if(req.session.uname != null){
		next();
	}else{
		res.redirect('/users/login');
	}

});

router.get('/home', (req, res) => res.render('manager/manager_home', { title: "Manager | Dashboard", user: req.session.uname, mid: req.session.uid}));

router.get('/profile', function(req, res){
    if(req.session.uname == null)
	{
		res.redirect('/users/login');
	}

	var id = req.session.uid;
	//var id = 1;
	console.log(req.session.uid)
	empModel.getById(id, function(result){
		if(!result){
            res.send('invalid');
		}else{
            res.render("manager/manager_profile", {title: "Profile", user : req.session.uname, userInfo: result});
		}
	});

	
});

router.get('/edit', function(req, res){
    if(req.session.uname == null)
	{
		res.redirect('/users/login');
	}

	var id = req.session.uid;
	//var id = 1;
	//console.log(req.session.uid)
	empModel.getById(id, function(result){
		if(!result){
            res.send('invalid');
		}else{
            res.render("manager/profile_edit", {title: "Edit Profile", user : req.session.uname, userInfo: result});
		}
	});

});

router.post('/edit', function(req, res){
	var emp = {
		id: req.session.uid,
		name: req.body.name,
		contact: req.body.contact,
		password: req.body.password
	};
	console.log(emp);
	empModel.update_manager(emp, function(status){
		if(status){
			res.redirect('/manager/profile');
		}else{
			res.send('Update Unsuccessful');
		}
	});
	
});

router.get('/createSeller', function(req, res){
    if(req.session.uname == null)
	{
		res.redirect('/users/login');
	}
	var id = req.session.uid;
	//var id = 1;
	//console.log(req.session.uid)
	outletModel.getByOutlet(id, function(result){
		if(!result){
            res.send('invalid');
		}else{
			req.session.oid = result.outlet_ID;
			//console.log(req.session.oid);
            res.render("manager/seller/create_seller", {title: "Create Seller", user : req.session.uname, outletInfo: result});
		}
	});
});

router.post('/createSeller', function(req, res){

	var user = {
		username: req.body.username,
		name : req.body.name,
		rank : 3,
		contact : req.body.contact,
		outlet : req.session.oid,
		password : req.body.password
	}

	empModel.insert(user, function(result){
		if(!result){
			res.send('emp insert unsuccessful');
		}else{		
			loginModel.insert(user, function(result){
				if(!result){
					res.send('insert unsuccessful');
				}else{		
					res.redirect('/manager/home');
				}
			});
		}
	});
	
});

router.get('/seller/list', (req, res) => res.render('manager/seller/seller_list', { title: "Employee | List", user: req.session.uname}));

router.get('/seller/searchAJAX/:key', function(req, res){
	var key = req.params.key;
	
	if(key == '*')
	{
		empModel.getSeller( function(result){
			//console.log(result)			
			if(!result){
				res.send(null);
			}else{
				//console.log(result);
				res.send(result);
			}
		});	
	}else{
		empModel.search(key, function(result){
			//console.log(result)
			
			if(!result){
				res.send(null);
			}else{
				//console.log(result);
				res.send(result);
			}
		});	
	}	
});

router.get('/seller/info/:id', function(req, res){
    var id = req.params.id;
    //console.log(id);
	empModel.getById(id, function(result){
        //console.log(result)
		if(!result){
			res.send('no result found');
		}else{		
			res.render('manager/seller/seller_info', { title: 'Manager | Seller | Info', user: req.session.uname, sellerInfo: result});
		}
	});
});

router.post('/seller/info/:id', function(req, res){
	var btype = req.body.buttonType;
	// FOR EDIT
    if( btype == 'edit'){

		var emp = {
			id: req.params.id,
			name: req.body.name,
			contact: req.body.contact
		};

        empModel.update(emp, function(status){
            if(status){
                res.redirect(`/manager/seller/info/${emp.id}`)
            }else{
                res.send('Update Unsuccessful');
            }
		});
	// FOR DELETE
    }else if(emp.btype == 'delete'){

		var id = req.params.id;
		empModel.delete(id, function(status){	
			if(status){
				res.redirect("/seller/list");
			}else{
			res.send('Delete Unsuccessful');	
			}
		});
	}
});

router.get('/seller/delete/:id', function(req, res){
    var id = req.params.id;
    //console.log(id);
	empModel.delete(sql, function(status){	
		if(status){
			res.redirect("/seller/list");
		}else{
			res.send('Delete unsuccessful');	
		}
	})
});

module.exports = router;