const express = require('express');
const router = express.Router();
const empModel = require('../models/emp-model');
const outletModel = require('../models/outlet-model');
const loginModel = require('../models/login-model');

router.get('/home', (req, res) => res.render('admin/admin_home', { title: "Admin | Dashboard", user: req.session.uname}));

router.get('/employee', (req, res) => res.render('admin/employee/emp_list', { title: "Admin | Employee", user: req.session.uname}));

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

router.get('/employee/create', function(req, res){

	outletModel.getAll(function(result){
        //console.log(result)
		if(!result){
			res.send('no outlet result found');
		}else{		
			res.render('admin/employee/emp_create', { title: 'Admin | Employee | Create', user: req.session.uname, outList: result});	
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
			res.render('admin/employee/emp_info', { title: 'Admin | Employee', user: req.session.uname, empInfo: result });
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
    }else if(emp.btype == 'delete'){

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