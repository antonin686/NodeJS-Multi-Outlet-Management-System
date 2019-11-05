const express = require('express');
const router = express.Router();
const empModel = require('../models/emp-model');
const itelmListModel = require('../models/itemList-model');
const loginModel = require('../models/login-model');
const invoiceModel = require('../models/invoice-model');
const orderModel = require('../models/admin/order-model');
//const fetchDropDown = require('../models/inventory-raw-model');

router.get('*', function(req, res, next){

	if(req.session.uname != null){
		next();
	}else{
		res.redirect('/users/login');
	}

});

// Admin/home
router.get('/home', (req, res) => res.render('seller/seller_home', {title: "Seller | Dashboard", user: req.session.uname}));

// Admin Outlet
//router.get('/itemList', (req, res) => res.render('seller/itemList', { title: "Admin | Outlet", user: req.session.uname}));
///seller/invoice/searchAjax/${f}
router.get('/invoice/searchAjax/:id', function(req,res){
    var id = req.params.id;
	itelmListModel.foodSearch(id,function(status){
		//console.log(status);
		if(status){
			res.send(status);
		}else{
			res.send("error");
		}
	});
});



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
			console.log(result);
            res.render("seller/profile", {title: "Profile", user : req.session.uname, userInfo: result});
		}
	});

	
});

router.get('/invoice', (req, res) => res.render('seller/invoice', { title: "Seller | Invoice", user: req.session.uname}));

router.post('/invoice', function(req, res){

	var invoice = {
		username: req.body.username,
		contact : req.body.contact,
		token : req.body.token,
		ticket : req.body.ticket,
		totalSum : req.body.cost,
		outID : req.session.outID,
		//bro: req.body
	}
	//console.log(invoice);

	invoiceModel.insert(invoice, function(result){ 
		if(!result){
			res.send('emp insert unsuccessful');
		}
		else{		
					res.redirect('/seller/home');
				}
			});
		 
	});

	

router.get('/itemList', function(req,res){
    
	itelmListModel.getAllItem(function(status){
		
		if(status){
			res.render('seller/itemList', {title:'Item List' ,user:req.session.uname, itemList:status});
		}else{
			res.send("error");
		}
	});
});

router.get('/rawGoodsEntry', function(req,res){
    
	itelmListModel.getAllRawtype(function(status){
		
		if(status){
			res.render('seller/rawGoodsEntry', {title:'Raw Goods | Inventory' ,user:req.session.uname, itemList:status});
		}else{
			res.send("error");
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

router.get('/employee/create', function(req, res){

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