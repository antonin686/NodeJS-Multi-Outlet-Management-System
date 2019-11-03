var db = require('./db');
var table_name = "raw_goods_inventory";



module.exports = {

    /*

    for($count = 0; $count < count($_POST["item_name"]); $count++)
    {  
     sql = "INSERT INTO tbl_order_items 
     (product_name, product_type, date, opening , receive ,total , exp , inventory_balance) 
     VALUES ('', '', '', '' , '' , '' , '' , '')
     ";
    }


    */

	insert: function(items, callback){

		var sql =`insert into ${table_name} values('', '${items.code}', '${items.type}', '${items.name}', '${items.cost}');`;
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

    
}
