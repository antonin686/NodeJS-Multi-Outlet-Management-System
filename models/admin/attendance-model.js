var db = require('./db');
var table_name = "attendance";
var table_id = "attend_ID";

module.exports = {

	getById: (id, callback) => {

		var sql = `select * from ${table_name} where ${table_id} = ${id}`;
		//console.log(sql);
		db.getResults(sql, function (result) {
			if (result.length > 0) {
				callback(result[0]);
			} else {
				callback(false);
			}
		});
	},

	getAllForToday: (callback) => {
		var sql = `select * from ${table_name}`;

		db.getResults(sql, function (results) {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getCountForToday: (callback) => {
		var sql = `SELECT COUNT(${table_id}) as total FROM ${table_name} WHERE date = CURDATE()`;

		db.getResults(sql, function (results) {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getAttendenceList: (data, callback) => {
		var sql = `SELECT e.emp_ID,e.username, e.name,   
		CASE WHEN a.attend_ID IS NOT NULL THEN 'Present' 
		ELSE 'Absent' 
		END as attendance_status
		FROM employee e
		LEFT JOIN attendance a on e.emp_ID=a.emp_ID AND a.date BETWEEN CURRENT_DATE() - ${data.time} and CURRENT_DATE() WHERE e.outlet_ID = ${data.outlet} and e.name like '%${data.key}%'`;
		//console.log(sql);
		db.getResults(sql, function (results) {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getAllInfo: (id, callback) => {
		var sql = `select em from employee where ${table_id} = ${id}`;

		db.getResults(sql, function (results) {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	search: (key, callback) => {
		var sql = `select * from ${table_name} where name like '%${key}%' `;

		db.getResults(sql, function (results) {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	insert: (outlet, callback) => {

		var sql = `insert into ${table_name} values('', '${outlet.name}', '${outlet.location}', '${outlet.city}')`;
		db.execute(sql, function (status) {
			callback(status);
		});
	},

	update: (outlet, callback) => {
		var sql = `update ${table_name} set name = '${outlet.name}', location = '${outlet.location}', city = '${outlet.city}' where ${table_id} = ${outlet.id}`;

		db.execute(sql, function (status) {
			callback(status);
		});
	},

	delete: (id, callback) => {
		var sql = `delete from ${table_name} where ${table_id}= ${id}`;
		db.execute(sql, function (status) {
			callback(status);
		});
	}
}