const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crudExprs',
    multipleStatements:true
})

connection.connect((error)=>{
    if(error) {
        console.log(error);
    } else {
        console.log("succesfully connected !!");
    }
})

module.exports = connection;