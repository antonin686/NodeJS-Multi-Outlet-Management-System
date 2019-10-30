const express = require('express');
const router = express.Router();
const empModel = require('../models/emp-model');
const outletModel = require('../models/outlet-model');
const loginModel = require('../models/login-model');


router.get('*', (req, res, next) => {
	if(req.session.uname != null && req.session.type == 1) {
		next();
	}else{
		res.redirect('/');
	}
});
// Admin/home
router.get('/home', (req, res) => res.render('admin/admin_home', {layout: 'layout_admin',title: "Admin | Dashboard", user: req.session.uname}));

// Admin Outlet
router.get('/outlet', (req, res) => res.render('admin/outlet/out_list', {layout: 'layout_admin', title: "Admin | Outlet", user: req.session.uname}));
router.get('/outlet/create', (req, res) => res.render('admin/outlet/out_create', { title: "Admin | Outlet | Create", user: req.session.uname, layout: 'layout_admin'}));

router.post('/outlet/create', function(req, res){

	var outlet = {
		name : req.body.name,
		location : req.body.location,
		city : req.body.city
	}

	outletModel.insert(outlet, function(result){
		if(!result){
			res.send('Outlet insert unsuccessful');
		}else{		
			res.redirect('/admin/outlet');				
		}
	});
	
});


router.get('/outlet/searchAjax/:key', function(req, res){
	var key = req.params.key;
	
	if(key == '*')
	{
		outletModel.getAll( function(result){
			//console.log(result)			
			if(!result){
				res.send(null);
			}else{
				//console.log(result);
				res.send(result);
			}
		});	
	}else{
		outletModel.search(key, function(result){
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

router.get('/outlet/employee/searchAjax/:id/:key', function(req, res){
	
	var id = req.params.id;
	var key = req.params.key;
	
	if(key == '*')
	{
		empModel.getAllByOutID(id, function(result){
			//console.log(result)			
			if(!result){
				res.send(null);
			}else{
				//console.log(result);
				res.send(result);
			}
		});	
	}else{
		empModel.searchByOutletID(id, key, function(result){
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

router.get('/outlet/info/:id', function(req, res){
    var id = req.params.id;
    //console.log(id);
	outletModel.getById(id, function(result){
        //console.log(result)
		if(!result){
			res.send('no result found');
		}else{		
			res.render('admin/outlet/out_info', { title: 'Admin | Outlet', user: req.session.uname, outInfo: result , layout: 'layout_admin'});
		}
	});
});

router.post('/outlet/info/:id', function(req, res){
	
	var btype = req.body.buttonType;
	// FOR EDIT
    if( btype == 'edit'){

		var outlet = {
			id : req.params.id,
			name : req.body.name,
			location : req.body.location,
			city : req.body.city
		};

        outletModel.update(outlet, function(status){
            if(status){
                res.redirect(`/admin/outlet/info/${outlet.id}`)
            }else{
                res.send('Update Unsuccessful');
            }
		});
	// FOR DELETE
    }else if(btype == 'delete'){

		var id = req.params.id;
		outletModel.delete(id, function(status){	
			if(status){
				res.redirect("/admin/outlet");
			}else{
				res.send('Delete Unsuccessful');	
			}
		});
	}
});

// Admin Employee
router.get('/employee', (req, res) => res.render('admin/employee/emp_list', { title: "Admin | Employee", user: req.session.uname, layout: 'layout_admin'}));

router.get('/employee/searchAJAX/:key', function(req, res){
	var key = req.params.key;
	
	if(key == '*')
	{
		empModel.getAll( function(result){
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

router.get('/employee/create', function(req, res) {

	outletModel.getAll(function(result){
        //console.log(result)
		if(!result){
			res.send('no outlet result found');
		}else{		
			res.render('admin/employee/emp_create', { title: 'Admin | Employee | Create', user: req.session.uname, outList: result, layout: 'layout_admin'});	
		}
	});
	
});

router.post('/employee/create', function(req, res){

	var user = {
		username: req.body.username,
		name : req.body.name,
		rank : req.body.rank,
		contact : req.body.contact,
		outlet : req.body.outlet,
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
					res.redirect('/admin/employee');
				}
			});
		}
	});
	
});

router.get('/employee/info/:id', function(req, res){
    var id = req.params.id;
    //console.log(id);
	empModel.getById(id, function(result){
        //console.log(result)
		if(!result){
			res.send('no result found');
		}else{		
			res.render('admin/employee/emp_info', { title: 'Admin | Employee', user: req.session.uname, empInfo: result , layout: 'layout_admin'});
		}
	});
});

router.post('/employee/info/:id', function(req, res){
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
                res.redirect(`/admin/employee/info/${emp.id}`)
            }else{
                res.send('Update Unsuccessful');
            }
		});
	// FOR DELETE
    }else if(btype == 'delete'){

		var id = req.params.id;
		empModel.delete(id, function(status){	
			if(status){
				res.redirect("/admin/employee");
			}else{
			res.send('Delete Unsuccessful');	
			}
		});
	}
});

router.get('/employee/delete/:id', function(req, res){
    var id = req.params.id;
    //console.log(id);
	empModel.delete(sql, function(status){	
		if(status){
			res.redirect("/admin/employee");
		}else{
			res.send('Delete unsuccessful');	
		}
	})
});

module.exports = router;