var db = require('./db');
var table_name = "outlet";
var table_id = "outlet_ID";

module.exports = {

	getById: function(id, callback){

		var sql = `select * from ${table_name} where ${table_id} = ${id}`;
		//console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback(false);
			}
		});
	},

	getAll: function(callback){
		var sql = `select * from ${table_name}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},

	getAllInfo: function(id, callback){
		var sql = `select em from employee where ${table_id} = ${id}`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	},
	
	search: function(key, callback){
		var sql = `select * from ${table_name} where name like '%${key}%' `;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
    },
    
	insert: function(user, callback){

		var sql =`insert into ${table_name} values('', '', '')`;
		db.execute(sql, function(status){
			callback(status);
		});
    },
    
	update: function(user, callback){
		var sql = `update ${table_name} set name = '${user.name}', phone = '${user.phone}' where ${table_id} = ${user.id}`;
		
		db.execute(sql, function(status){
			callback(status);
		});
    },
    
	delete: function(id, callback){
		var sql = `delete from ${table_name} where id= ${id}`;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}
