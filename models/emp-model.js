var db = require('./db')
var table_name = "employee";
var table_pass = "login";
var table_id = "emp_ID";

module.exports = {

	getById: function(id, callback){

		var sql = `SELECT employee.emp_ID, employee.username,employee.name, login.password , employee.contact, rank.rank_name as rank FROM login,employee,rank WHERE rank.rank_id = login.type and employee.username = login.username and ${table_id}= ${id}`;
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
		//console.log(sql);
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

		var sql =`insert into ${table_name} values('', '${user.username}', '${user.name}', '${user.contact}', '${user.outlet}');`;
		console.log(sql);
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
		console.log(sql);
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
