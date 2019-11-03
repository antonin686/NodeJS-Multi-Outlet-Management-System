var db = require('./db');
var table_name = "booking";
var table_id = "booking_ID";

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
		var sql = `SELECT COUNT(${table_id}) as booking_count FROM ${table_name} WHERE DATE(date) = CURDATE()`;
			//console.log(sql);
		db.getResults(sql, function (results) {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getBookingList: (data, callback) => {
		var sql = `SELECT booking.booking_ID, outlet.outlet_ID, outlet.name, booking.table_ID, booking.booked_by, booking.contact,  DATE_FORMAT(booking.date, "%l:%i %p - %D %M") as date FROM booking, outlet WHERE outlet.outlet_ID = booking.outlet_ID AND booking.date BETWEEN CURRENT_DATE() - ${data.time} AND NOW() and booking.outlet_ID = ${data.outlet} and  booking.booked_by like '%${data.key}%'`;
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

	insert: (booking, callback) => {

		var sql = `insert into ${table_name} values('', '${booking.outlet_id}', '${booking.table_id}', '${booking.booked_by}', '${booking.contact}', '${booking.date}')`;
		console.log(sql)
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