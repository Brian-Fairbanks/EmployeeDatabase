const connection = require("./connection.js");

function getEmployees(){
    return connection.query("select * from employee")
}

module.exports ={
    getEmployees,
    connection
}