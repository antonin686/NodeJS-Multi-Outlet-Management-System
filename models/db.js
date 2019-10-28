var mysql = require('mysql');

var getConnection = function(callback){
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'atp3db'
	});
	 
	connection.connect(function(err) {
		if (err) {
		  console.error('error connecting: ' + err.stack);
		  return;
		}
   
	//console.log('connected as id ' + connection.threadId);
  });
  callback(connection);
}

module.exports = {

  getResults : function(sql, params,callback){
	  getConnection(function (connection){

		  if(params != null){
			  connection.query(sql, params, function (error, results) {
				  callback(results);
			  });
			  connection.end(function(err){
				  console.log('connection end...');
			  });
		  }else{
			  connection.query(sql, function (error, results) {
				  callback(results);
			  });
			  connection.end(function(err){
				  console.log('connection end...');
			  });
		  }
	  });
  },
  execute : function(sql, params, callback){
	  getConnection(function (connection){

		  if(params != null){
			  connection.query(sql, params, function (error, results) {
				  if(error){
					  callback(false);
				  }else{
					  callback(true);
				  }
			  });
			  connection.end(function(err){
				  console.log('connection end...');
			  });
		  }else{
			  connection.query(sql, function (error, results) {
				  if(error){
					  callback(false);
				  }else{
					  callback(true);
				  }
			  });
			  connection.end(function(err){
				  console.log('connection end...');
			  });
		  }
	  });
  }
}