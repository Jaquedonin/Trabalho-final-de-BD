var mysql      = require('mysql');

var connection = mysql.createConnection({
    //connectionLimit    : 100,
    host               : 'localhost',
    port               : 3306,
    user               : 'root',
    password           : '',
    database           : 'facebook'//,
    //multipleStatements : true
});

module.exports.connection = connection;