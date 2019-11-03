var db = require('./db');
var table_name = "salary_scale";
var table_id = "scale_id";

module.exports = {

	getById: (id, callback) => {

		var sql = `select * from ${table_name} where ${table_id} = ${id}`;
		//console.log(sql);
		db.getResults(sql, (result) => {
			if (result.length > 0) {
				callback(result[0]);
			} else {
				callback(false);
			}
		});
	},

	getAll: (callback) => {
		var sql = `select * from ${table_name} order by time desc`;
		//console.log(sql);
		db.getResults(sql, (result) => {
			if (result.length > 0) {
				callback(result);
			} else {
				callback(false);
			}
		});
	},
	

	insert: (data, callback) => {

		var sql = `insert into ${table_name} values('', '${data.time}', '${data.per}')`;
		db.execute(sql, (status) => {
			callback(status);
		});
	},

	update: (data, callback) => {

		var sql = `update ${table_name} set time = '${data.time}', percentage = '${data.per}' where ${table_id} = ${data.id}`;
		//console.log(sql)
		db.execute(sql, (status) => {
			callback(status);
		});
	},

	delete: (id, callback) => {
		var sql = `delete from ${table_name} where ${table_id}= ${id}`;
		db.execute(sql, (status) => {
			callback(status);
		});
	}
}