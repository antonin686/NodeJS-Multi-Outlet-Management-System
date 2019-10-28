var db = require('./db')

module.exports = {

	validate: function(user, callback){
        
        var sql = `select * from login where username='${user.username}' and password= '${user.password}'`;
        
        db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result[0].type);
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

		var sql ="insert into user values('', '"+ user.username+"', '"+user.password+"')";
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
	}
}
