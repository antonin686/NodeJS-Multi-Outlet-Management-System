var db = require('./db');

module.exports = {
	insert: function(item, callback){

		var sql =`insert into item_type values('', '${item.name}');`;
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

	getAll: function(callback){
		var sql = `select * from item_type`;
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});	
	}
	
}

