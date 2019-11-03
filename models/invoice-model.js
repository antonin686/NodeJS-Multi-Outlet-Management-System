var db = require('./db');
var table_name = "invoice";



module.exports = {
    insert: function(items, callback){

		var sql =`insert into ${table_name} values('', '${items.username}', '${items.contact}', '${items.token}', '${items.ticket}', '${items.totalSum}', '${items.outID}');`;
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

}
