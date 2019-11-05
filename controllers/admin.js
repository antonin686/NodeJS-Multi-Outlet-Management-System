const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
	check,
	validationResult
} = require('express-validator');
const empModel = require('../models/admin/emp-model');
const outletModel = require('../models/admin/outlet-model');
const loginModel = require('../models/login-model');
const orderModel = require('../models/admin/order-model');
const bookingModel = require('../models/admin/booking-model');
const attendenceModel = require('../models/admin/attendance-model');
const inventoryModel = require('../models/admin/inventory-model');
const salaryModel = require('../models/admin/salary_scale-model');

// init storage
const storage = multer.diskStorage({
	destination: './public/uploads/img/',
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	}
});

//Init Upload
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10000000
	},
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	}
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}

router.get('*', (req, res, next) => {
	if (req.session.uname != null && req.session.type == 1) {
		next();
	} else {
		res.redirect('/');
	}
});

// Admin home
router.get('/home', (req, res) => res.render('admin/admin_home', {
	layout: 'layout_admin',
	title: "Admin | Dashboard",
	user: req.session.uname
}));

// Admin Profile
router.get('/profile', (req, res) => {
	var id = req.session.uid;

	empModel.getById(id, (result) => {
		//console.log(result)
		if (!result) {
			res.send('no result found');
		} else {
			res.render('admin/profile', {
				title: 'Admin | Employee',
				user: req.session.uname,
				empInfo: result,
				layout: 'layout_admin'
			});
		}
	});
});

router.post('/profile', (req, res) => {
	var emp = {
		id: req.session.uid,
		name: req.body.name,
		contact: req.body.contact,
	};

	empModel.update_admin(emp, (status) => {
		if (status) {
			res.redirect(`/admin/profile`)
		} else {
			res.send('Update Unsuccessful');
		}
	});

});

router.get('/profile/changePassword/:pass', (req, res) => {
	var user = {
		username: req.session.uname,
		password: req.params.pass
	};

	loginModel.changePassword(user, (status) => {
		if (status) {
			res.send(true);
		} else {
			res.send(false);
		}
	});

});


// Admin Inventory
router.get('/inventory', (req, res) => {

	outletModel.getAll((result) => {
		//console.log(result)
		if (!result) {
			res.send('no result found');
		} else {
			res.render('admin/inventory/inventory_list', {
				layout: 'layout_admin',
				title: 'Admin | Inventory',
				user: req.session.uname,
				outList: result
			});
		}
	});
});

router.get('/inventory/getInventoryList/:outlet/:time/:key', (req, res) => {
	var key = req.params.key;
	var data = {
		outlet: req.params.outlet,
		time: req.params.time,
		key: key == '*' ? '' : key
	}

	inventoryModel.getInventoryList(data, (result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});
});
// Admin Order

router.get('/order', (req, res) => {

	outletModel.getAll((result) => {
		//console.log(result)
		if (!result) {
			res.send('no result found');
		} else {
			res.render('admin/order/order_list', {
				layout: 'layout_admin',
				title: 'Admin | Order',
				user: req.session.uname,
				outList: result
			});
		}
	});
});

router.get('/order/getOrderList/:outlet/:time/:key', (req, res) => {
	var key = req.params.key;
	var data = {
		outlet: req.params.outlet,
		time: req.params.time,
		key: key == '*' ? '' : key
	}

	orderModel.getOrderList(data, (result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});
});

router.get('/order/countAjax/', (req, res) => {

	orderModel.getCountForToday((result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});
});

router.get('/order/totalTransactionAjax/', (req, res) => {

	orderModel.getTotalTransactionForTnY((result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});
});

// Admin Booking
router.get('/booking', (req, res) => {

	outletModel.getAll((result) => {
		//console.log(result)
		if (!result) {
			res.send('no result found');
		} else {
			res.render('admin/booking/booking_list', {
				layout: 'layout_admin',
				title: 'Admin | Order',
				user: req.session.uname,
				outList: result
			});
		}
	});
});

router.get('/booking/create', (req, res) => {

	outletModel.getAll((result) => {
		if (!result) {
			res.send('Outlet insert unsuccessful');
		} else {
			res.render('admin/booking/booking_create', {
				layout: 'layout_admin',
				title: "Admin | Booking",
				user: req.session.uname,
				outList: result,
				errs : 'undefined'
			})
		}
	});

});

router.post('/booking/create', [

	check('table', 'Table cant be empty').not().isEmpty(),
	check('date', 'Date cant be empty').not().isEmpty(),
	check('booked_by', 'Booked By cant be empty').not().isEmpty(),
	check('contact', 'Invalid Contact').isLength({
		min: 11,
		max: 11
	}),
	check('booked_by', 'Booked By cant be empty').not().isEmpty(),

], (req, res) => {

	var booking = {
		outlet_id: req.body.outlet,
		table_id: req.body.table,
		booked_by: req.body.booked_by,
		contact: req.body.contact,
		date: req.body.date,
	}

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		
		outletModel.getAll((result) => {
			if (!result) {
				res.send('Outlet insert unsuccessful');
			} else {
				res.render('admin/booking/booking_create', {
					layout: 'layout_admin',
					title: "Admin | Booking",
					user: req.session.uname,
					outList: result,
					errs : errors.array()
				})
			}
		});
	} else {

		bookingModel.insert(booking, (result) => {
			if (!result) {
				res.send('booking insert unsuccessful');
			} else {
				res.redirect('/admin/booking');
			}
		});

	}

});

router.get('/booking/getBookingList/:outlet/:time/:key', (req, res) => {
	var key = req.params.key;
	var data = {
		outlet: req.params.outlet,
		time: req.params.time,
		key: key == '*' ? '' : key
	}

	bookingModel.getBookingList(data, (result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});
});

router.get('/booking/countAjax/', (req, res) => {

	bookingModel.getCountForToday((result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});

});

// Admin Salary
router.get('/employee/salary/', (req, res) => {

	salaryModel.getAll((result) => {
		console.log(result)
		if (!result) {
			res.send(null);
		} else {
			res.render('admin/employee/emp_salary', {
				layout: 'layout_admin',
				title: "Admin | Employee",
				user: req.session.uname,
				scaleList: result
			});
		}
	});
});

router.post('/employee/salary/', (req, res) => {
	var data = {
		id: req.body.scale_id,
		time: req.body.time,
		per: req.body.per
	}
	salaryModel.update(data, (result) => {
		console.log(result)
		if (!result) {
			res.send(null);
		} else {
			res.redirect('/admin/employee/salary');
		}
	});
});

router.get('/employee/salary/delete/:id', (req, res) => {
	var id = req.params.id;

	salaryModel.delete(id, (result) => {
		//console.log(result)			
		if (!result) {
			res.send(null);
		} else {
			res.redirect('/admin/employee/salary');
		}
	});
});

router.get('/employee/salary/create', (req, res) => res.render('admin/employee/emp_salary_create', {
	layout: 'layout_admin',
	title: "Admin | Salary",
	user: req.session.uname,
	errs: 'undefined'
}));

router.post('/employee/salary/create/', [

	check('time', 'Time cant be empty').not().isEmpty(),

	check('per', 'Percentage cant be empty').not().isEmpty(),

], (req, res) => {

	var data = {
		time: req.body.time,
		per: req.body.per
	}

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.render('admin/employee/emp_salary_create', {
			title: "Admin | Employee | Salary",
			user: req.session.uname,
			layout: 'layout_admin',
			errs: errors.array()
		})
	} else {

		salaryModel.insert(data, (result) => {
			//console.log(result)			
			if (!result) {
				res.send(null);
			} else {
				res.redirect('/admin/employee/salary');
			}
		});
	}
});

router.get('/employee/salary/getAjax', (req, res) => {

	salaryModel.getAll((result) => {
		//console.log(result)			
		if (!result) {
			res.send(null);
		} else {
			res.send(result);
		}
	});
});

router.get('/employee/salary/update/:id/:sal', (req, res) => {
	var user = {
		id: req.params.id,
		sal: req.params.sal
	}
	empModel.updateSalary(user, (result) => {
		//console.log(result)			
		if (!result) {
			res.send(null);
		} else {
			res.send(true);
		}
	});
});

// Admin Attendance

router.get('/employee/attendance/', (req, res) => {

	outletModel.getAll((result) => {
		//console.log(result)			
		if (!result) {
			res.send(null);
		} else {
			res.render('admin/employee/emp_attendance', {
				layout: 'layout_admin',
				title: "Admin | Employee",
				user: req.session.uname,
				outList: result
			});
		}
	});
});

router.get('/attendence/getAttendenceList/:outlet/:time/:key', (req, res) => {
	var key = req.params.key;
	var data = {
		outlet: req.params.outlet,
		time: req.params.time,
		key: key == '*' ? '' : key
	}

	attendenceModel.getAttendenceList(data, (result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});
});

router.get('/attendence/totalAttendenceAjax', (req, res) => {

	empModel.getTotalEmp((result1) => {
		//console.log(result)			
		if (!result1) {
			res.send(null);
		} else {

			attendenceModel.getCountForToday((result2) => {
				//console.log(result)			
				if (!result2) {
					res.send(null);
				} else {
					//console.log(result1, '', result2);
					var result = {
						totalEmp: result1[0].total,
						totalAtt: result2[0].total
					}
					res.send(result);
				}
			});
		}
	});

});

// Admin graph

router.get('/graph/outletTransactionAjax', (req, res) => {

	orderModel.getOutletTransactionForToday((result) => {
		//console.log(result)			
		if (!result) {
			res.send(null);
		} else {
			res.send(result);
		}
	});

});

router.get('/graph/totalWeeklyTransactionsAjax', (req, res) => {

	orderModel.getTotalWeeklyTransaction((result) => {
		//console.log(result)			
		if (!result) {
			res.send(null);
		} else {
			res.send(result);
		}
	});
});

// Admin Outlet
router.get('/outlet', (req, res) => res.render('admin/outlet/out_list', {
	layout: 'layout_admin',
	title: "Admin | Outlet",
	user: req.session.uname
}));
router.get('/outlet/create', (req, res) => res.render('admin/outlet/out_create', {
	title: "Admin | Outlet | Create",
	user: req.session.uname,
	layout: 'layout_admin',
	errs: 'undefined'
}));

router.get('/outlet/totalOutletAjax/', (req, res) => {

	outletModel.getOutletCount((result) => {
		//console.log(result)
		if (!result) {
			res.send(null);
		} else {
			//console.log(result);
			res.send(result);
		}
	});

});

router.post('/outlet/create', [
	check('name', 'Name minimum length 5').isLength({
		min: 5
	}),

	check('location', 'Location cant be empty').not().isEmpty(),

	check('city', 'City cant be empty').not().isEmpty(),

], (req, res) => {

	var outlet = {
		name: req.body.name,
		location: req.body.location,
		city: req.body.city
	}

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.render('admin/outlet/out_create', {
			title: "Admin | Outlet | Create",
			user: req.session.uname,
			layout: 'layout_admin',
			errs: errors.array()
		})
	} else {
		outletModel.insert(outlet, (result) => {
			if (!result) {
				res.send('Outlet insert unsuccessful');
			} else {
				res.redirect('/admin/outlet');
			}
		});
	}



});

router.get('/outlet/searchAjax/:key', (req, res) => {
	var key = req.params.key;

	if (key == '*') {
		outletModel.getAll((result) => {
			//console.log(result)			
			if (!result) {
				res.send(null);
			} else {
				//console.log(result);
				res.send(result);
			}
		});
	} else {
		outletModel.search(key, (result) => {
			//console.log(result)

			if (!result) {
				res.send(null);
			} else {
				//console.log(result);
				res.send(result);
			}
		});
	}
});

router.get('/outlet/employee/searchAjax/:id/:key', (req, res) => {

	var id = req.params.id;
	var key = req.params.key;

	if (key == '*') {
		empModel.getAllByOutID(id, (result) => {
			//console.log(result)			
			if (!result) {
				res.send(null);
			} else {
				//console.log(result);
				res.send(result);
			}
		});
	} else {
		empModel.searchByOutletID(id, key, (result) => {
			//console.log(result)

			if (!result) {
				res.send(null);
			} else {
				//console.log(result);
				res.send(result);
			}
		});
	}
});

router.get('/outlet/info/:id', (req, res) => {
	var id = req.params.id;
	//console.log(id);
	outletModel.getById(id, (result) => {
		//console.log(result)
		if (!result) {
			res.send('no result found');
		} else {
			res.render('admin/outlet/out_info', {
				title: 'Admin | Outlet',
				user: req.session.uname,
				outInfo: result,
				layout: 'layout_admin'
			});
		}
	});
});

router.post('/outlet/info/:id', (req, res) => {

	var outlet = {
		id: req.params.id,
		name: req.body.name,
		location: req.body.location,
		city: req.body.city
	};

	outletModel.update(outlet, (status) => {
		if (status) {
			res.redirect(`/admin/outlet/info/${outlet.id}`)
		} else {
			res.send('Update Unsuccessful');
		}
	});

});

router.get('/outlet/delete/:id', (req, res) => {

	var id = req.params.id;

	outletModel.delete(id, (status) => {
		if (status) {
			res.redirect("/admin/outlet");
		} else {
			res.send('Delete Unsuccessful');
		}
	});
});

// Admin Employee
router.get('/employee', (req, res) => res.render('admin/employee/emp_list', {
	title: "Admin | Employee",
	user: req.session.uname,
	layout: 'layout_admin'
}));

router.get('/employee/searchUsernameAjax/:key', (req, res) => {
	var key = req.params.key;

	
	
		empModel.search(key, (result) => {
			//console.log(result)

			if (!result) {
				res.send(false);
			} else {
				//console.log(result);
				res.send(result);
			}
		});
	
});

router.get('/employee/searchAJAX/:key', (req, res) => {
	var key = req.params.key;

	if (key == '*') {
		empModel.getAll((result) => {
			//console.log(result)			
			if (!result) {
				res.send(null);
			} else {
				//console.log(result);
				res.send(result);
			}
		});
	} else {
		empModel.search(key, (result) => {
			//console.log(result)

			if (!result) {
				res.send(null);
			} else {
				//console.log(result);
				res.send(result);
			}
		});
	}
});

router.get('/employee/create', (req, res) => {

	outletModel.getAll((result) => {
		//console.log(result)
		if (!result) {
			res.send('no outlet result found');
		} else {
			res.render('admin/employee/emp_create', {
				title: 'Admin | Employee | Create',
				user: req.session.uname,
				outList: result,
				success: false,
				errors: req.session.erros,
				layout: 'layout_admin',
				errMsg: false
			});
		}
	});

});

router.post('/employee/create', (req, res) => {

	upload(req, res, (err) => {
		if (err) {
			outletModel.getAll((result) => {
				//console.log(result)
				if (!result) {
					res.send('no outlet result found');
				} else {
					res.render('admin/employee/emp_create', {
						title: 'Admin | Employee | Create',
						user: req.session.uname,
						outList: result,
						success: false,
						errors: req.session.erros,
						layout: 'layout_admin',
						errMsg: err
					});
				}
			});
		
		} else {
			if (req.file == null) {
				outletModel.getAll((result) => {
					//console.log(result)
					if (!result) {
						res.send('no outlet result found');
					} else {
						res.render('admin/employee/emp_create', {
							title: 'Admin | Employee | Create',
							user: req.session.uname,
							outList: result,
							success: false,
							errors: req.session.erros,
							layout: 'layout_admin',
							errMsg: 'no image selected'
						});
					}
				});
			
			} else {

				// validate
				var user = {
					username: req.body.username,
					name: req.body.name,
					rank: req.body.rank,
					contact: req.body.contact,
					outlet: req.body.outlet,
					password: req.body.password,
					salary: req.body.salary,
					imgPath: req.file.filename
				}
				
				
				
				empModel.insert(user, (result) => {
					if (!result) {
						res.send('emp insert unsuccessful');
					} else {
						loginModel.insert(user, (result) => {
							if (!result) {
								res.send('insert unsuccessful');
							} else {
								res.redirect('/admin/employee');
							}
						});
					}
				}); 
			}
		}
	});
	/*
	 */

});

router.get('/employee/info/:id', (req, res) => {
	var id = req.params.id;
	//console.log(id);
	empModel.getById(id, (result) => {
		//console.log(result)
		if (!result) {
			res.send('no result found');
		} else {
			res.render('admin/employee/emp_info', {
				title: 'Admin | Employee',
				user: req.session.uname,
				empInfo: result,
				layout: 'layout_admin'
			});
		}
	});
});

router.post('/employee/info/:id', (req, res) => {


	upload(req, res, (err) => {
		if (err) {
			res.send(err)
		} else {
			console.log(req.file);
			if (req.file == undefined) {
				var emp = {
					id: req.params.id,
					name: req.body.name,
					contact: req.body.contact,
					salary: req.body.salary
				};

				empModel.update(emp, (status) => {
					if (status) {
						res.redirect(`/admin/employee/info/${emp.id}`)
					} else {
						res.send('Update Unsuccessful');
					}
				});
			} else {
				console.log('here')
				var emp = {
					id: req.params.id,
					name: req.body.name,
					contact: req.body.contact,
					salary: req.body.salary,
					imgPath: req.file.filename
				};

				empModel.updateWithImg(emp, (status) => {
					if (status) {
						res.redirect(`/admin/employee/info/${emp.id}`)
					} else {
						res.send('Update Unsuccessful');
					}
				});
			}
		}
	});






});

router.get('/employee/delete/:username', (req, res) => {
	var username = req.params.username;
	//console.log(id);
	empModel.delete(username, (status) => {
		if (status) {
			res.redirect("/admin/employee");
		} else {
			res.send('Delete unsuccessful');
		}
	})
});

module.exports = router;