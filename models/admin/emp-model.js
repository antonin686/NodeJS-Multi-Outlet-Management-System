var db = require('./db')
var table_name = "employee";
var table_pass = "login";
var table_id = "emp_ID";

module.exports = {

	getById: function(id, callback){

		var sql = `SELECT employee.emp_ID, employee.img_path,employee.username,employee.salary,DATE_FORMAT(employee.join_date, '%D %b %y') as date,employee.name, login.password , employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username and ${table_id}= ${id}`;
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
		var sql = `SELECT employee.emp_ID, TIMESTAMPDIFF(MONTH, employee.join_date, CURDATE()) as old,employee.name,employee.salary, employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username`;
		console.log(sql)
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

		var sql =`insert into ${table_name} values('', '${user.username}', '${user.name}', '${user.contact}', '${user.outlet}','${user.salary}',CURDATE(),'${user.imgPath}');`;
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

	update: function(user, callback){
		var sql = `update ${table_name} set name = '${user.name}', contact = '${user.contact}', salary = '${user.salary}' where ${table_id} = ${user.id}`;
		
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	updateWithImg: function(user, callback){
		var sql = `update ${table_name} set img_path = '${user.imgPath}', name = '${user.name}', contact = '${user.contact}', salary = '${user.salary}' where ${table_id} = ${user.id}`;
		console.log(sql)
		db.execute(sql, function(status){
			callback(status);
		});
	},

	updateSalary: function(user, callback){
		var sql = `update ${table_name} set  salary = '${user.sal}' where ${table_id} = ${user.id}`;
		//console.log(sql)
		db.execute(sql, function(status){
			callback(status);
		});
	},

	update_manager: function(user, callback){
		var sql = `update employee, login set employee.name = '${user.name}', employee.contact = '${user.contact}' ,login.password = '${user.password}' where employee.username = login.username AND  ${table_id} = ${user.id}`;
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	
	delete: function(username, callback){
		var sql = `DELETE login , employee FROM login INNER JOIN employee WHERE login.username = employee.username and login.username = '${username}'`;
		db.execute(sql, function(status){
			callback(status);
		});
	}, 

	/////////////////
	getTotalEmp: (callback) => {
		var sql = `SELECT COUNT(employee.emp_ID) as total FROM employee,login where employee.username = login.username and NOT login.type = 1`;
		//console.log(sql);
		db.getResults(sql, function(status){
			callback(status);
		});
	},

	update_admin: function(user, callback){
		var sql = `update ${table_name} set name = '${user.name}', contact = '${user.contact}' where ${table_id} = ${user.id}`;
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	

}
