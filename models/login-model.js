var db = require('./db');
module.exports = {
	validate: function(user, callback){
		var sql ="select * from users where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(false);
			}
		});	
	}
}