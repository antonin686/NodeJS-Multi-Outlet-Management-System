var db = require('./db')
var table_name = "employee";
var table_pass = "login";
var table_id = "emp_ID";

module.exports = {

	getById: function(id, callback){

		var sql = `SELECT employee.emp_ID, employee.username,employee.name, login.password , employee.contact,employee.outlet_ID, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username and ${table_id}= ${id}`;
		//console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0 ){
				callback(result[0]);
				//console.log(result[0]);
			}else{
				callback(false);
			}
		});
	},

	getAll: function(callback){
		var sql = `SELECT employee.emp_ID, employee.name, employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},

	getAllByOutID: function(id, callback){
		var sql = `SELECT employee.emp_ID, employee.name, employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username and outlet_ID = ${id}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},
		
	getSeller: function(callback){
		var sql = `SELECT employee.emp_ID, employee.name, employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username and login.type = 3`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},

	getAllSellerByOutlet: function(id,callback){
		var sql = `SELECT employee.name as employee,employee.emp_ID,employee.username,employee.outlet_ID,outlet.outlet_ID,outlet.name,login.username as uname,login.type from employee,outlet,login WHERE employee.outlet_ID = outlet.outlet_ID and employee.username = login.username and login.type = 3 and outlet.outlet_ID= ${id}`;
		//console.log(sql)
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},

	countAllSellerByOutlet: function(id,callback){
		var sql = `SELECT count(emp_ID) as count1 from employee where outlet_ID= ${id}`;
		//console.log(sql)
		db.getResults(sql, function(results){
			
			if(results){
				callback(results[0]);
			}else{
				callback(false);
			}
		});	
	},

	countAllSellerAttendance: function(id,callback){
		var sql = `SELECT count(emp_ID) as count2 from employee_attendance where outlet_ID= ${id} and date = CURRENT_DATE`;
		//console.log(sql)
		db.getResults(sql, function(results){
			
			if(results){
				callback(results[0]);
			}else{
				callback(false);
			}
		});	
	},
	countOrders: function(id,callback){
		var sql = `SELECT count(order_ID) as count3 from orders where outlet_ID= ${id} and date = CURRENT_DATE`;
		//console.log(sql)
		db.getResults(sql, function(results){
			
			if(results){
				callback(results[0]);
			}else{
				callback(false);
			}
		});	
	},
	countPrice: function(id,callback){
		var sql = `SELECT SUM(total_price) as count4 from orders where outlet_ID= ${id} and date = CURRENT_DATE`;
		//console.log(sql)
		db.getResults(sql, function(results){
			
			if(results){
				callback(results[0]);
			}else{
				callback(false);
			}
		});	
	},


	getSellerByOutlet: function(id,callback){
		var sql = `SELECT employee.name as employee,employee.emp_ID,employee.username,employee.outlet_ID,outlet.outlet_ID,outlet.name,login.username as uname,login.type from employee,outlet,login WHERE employee.outlet_ID = outlet.outlet_ID and employee.username = login.username and login.type = 3 and outlet.outlet_ID= ${id}`;
		//console.log(sql)
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},


	search: function(key, callback){
		var sql = `SELECT employee.emp_ID, employee.name, employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username and employee.name like '%${key}%' `;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},

	searchByOutletID: function(id,key, callback){
		var sql = `SELECT employee.emp_ID, employee.name, employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username and employee.name like '%${key}%' and outlet_ID = ${id}`;
		//console.log(sql);
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},

	insert: function(user, callback){

		var sql =`insert into ${table_name} values('', '${user.username}', '${user.name}', '${user.contact}', '${user.outlet}', '${user.salary}', '${user.date}');`;
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

	update: function(user, callback){
		var sql = `update ${table_name} set name = '${user.name}', contact = '${user.contact}' where ${table_id} = ${user.id}`;
		
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	update_manager: function(user, callback){
		var sql = `update employee, login set employee.name = '${user.name}', employee.contact = '${user.contact}' ,login.password = '${user.password}' where employee.username = login.username AND  ${table_id} = ${user.id}`;
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	

	delete: function(id, callback){
		var sql = `delete from ${table_name} where ${table_id} = ${id}`;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}
