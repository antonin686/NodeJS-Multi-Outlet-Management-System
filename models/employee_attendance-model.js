var db = require('./db');
const table_name = "employee_attendance";

module.exports = {


    insert: function(sellers, callback){

		var sql =`insert into ${table_name} values('', '${sellers.username}', '${sellers.name}', '${sellers.outlet}', '${sellers.date}');`;
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
}