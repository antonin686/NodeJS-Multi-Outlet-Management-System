var db = require('./db');
var table_name = "raw_goods_inventory";
var table_id = "id";

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

	getAllForToday: (callback) => {
		var sql = `select * from ${table_name}`;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},
	
	getAllForOutlet: (id, callback) => {
		var sql = `select * from ${table_name} where outlet_ID = ${id}`;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getInventoryList: (data, callback) => {
		var sql = `SELECT id,product_name,product_type,total,DATE_FORMAT(date,'%D %b, %y') as date FROM ${table_name} WHERE date BETWEEN CURRENT_DATE() - ${data.time} AND CURRENT_DATE() and outlet_ID = 1 and product_name like '%${data.key}%'`;
		//console.log(sql);
		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},
	
	getCountForToday: (callback) => {
		var sql = `SELECT COUNT(order_id) as order_count FROM ${table_name} WHERE date = CURDATE()`;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getTotalTransactionForTnY: (callback) => {
		var sql = `SELECT date,sum(total_price) as total from ${table_name} GROUP BY date HAVING date BETWEEN CURRENT_DATE() - 1 AND CURRENT_DATE()`;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getTotalWeeklyTransaction: (callback) => {
		var sql = `SELECT DATE_FORMAT(date, '%a') as day,sum(total_price) as total from ${table_name} GROUP BY date HAVING date BETWEEN CURRENT_DATE() - 7 AND CURRENT_DATE()`;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	getOutletTransactionForToday: (callback) => {
		var sql = `SELECT date, outlet_id, SUM(total_price) as total FROM ${table_name} GROUP BY outlet_id,date HAVING date = CURRENT_DATE();`;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},


	getAllInfo: (id, callback) => {
		var sql = `select em from employee where ${table_id} = ${id}`;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	search: (key, callback) => {
		var sql = `select * from ${table_name} where name like '%${key}%' `;

		db.getResults(sql, (results) => {

			if (results.length > 0) {
				callback(results);
			} else {
				callback(false);
			}
		});
	},

	insert: (outlet, callback) => {

		var sql = `insert into ${table_name} values('', '${outlet.name}', '${outlet.location}', '${outlet.city}')`;
		db.execute(sql, (status) => {
			callback(status);
		});
	},

	update: (outlet, callback) => {
		var sql = `update ${table_name} set name = '${outlet.name}', location = '${outlet.location}', city = '${outlet.city}' where ${table_id} = ${outlet.id}`;

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