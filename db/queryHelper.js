const connection = require("./connection.js");

function getEmployees(addition){
    console.log(addition);
    return connection.query(`
        SELECT employees.id as id, first_name, last_name,title, name, salary, manager_id 
        FROM employees
        INNER JOIN roles
        ON employees.role_id = roles.id
        INNER JOIN departments
        ON roles.department_id = departments.id
        ${addition};
    `);
}

module.exports ={
    getEmployees,
    connection
}