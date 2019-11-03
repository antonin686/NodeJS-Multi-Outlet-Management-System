var db = require('./db');
var table_name = 'login';

module.exports = {

	validate: function(user, callback){
        
        var sql = `select login.login_ID, login.username, login.password,login.type,employee.emp_ID,employee.username, employee.outlet_ID from login,employee where login.username='${user.username}' and login.password ='${user.password}' and login.login_ID = employee.emp_ID and login.username = employee.username`;
        //console.log(sql);
        db.getResults(sql, function(result){
			console.log(result[0]);
			if(result.length > 0){			
				callback(result[0]);
			}else{
				callback(false);
        }
		});	
	},

	getAll: function(callback){
		var sql = "select * from user";
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	 
	},

	insert: function(user, callback){

		var sql =`insert into login values('', '${user.username}', '${user.password}', '${user.rank}')`;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	update: function(user, callback){
		var sql ="update user set username='"+ user.username+"', password='"+user.password+"' where id="+user.id;
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},

	delete: function(id, callback){
		var sql = "delete from user where id="+id;
		db.execute(sql, function(status){
			callback(status);
		});
	},

	changePassword: function(user, callback){
		var sql = `update ${table_name} set password = '${user.password}' where username = '${user.username}'`;
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
}
