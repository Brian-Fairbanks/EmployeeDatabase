const connection = require("./connection.js");

function getEmployees(addition){
    return connection.query(`
        SELECT employees.id as id, employees.first_name, employees.last_name,title, name, salary, CONCAT(mt.first_name, " ",mt.last_name) as manager 
        FROM employees
        INNER JOIN roles
        ON employees.role_id = roles.id
        INNER JOIN departments
        ON roles.department_id = departments.id
        left JOIN employees as mt
        ON employees.manager_id = mt.id
        ${addition};
    `);
}


function getEmployeeNames(){
    return connection.query(`
        SELECT id, CONCAT(first_name, " ",last_name) as name
        FROM employees
    `);
}

function getDepartments(){
    return connection.query(`
        SELECT name 
        FROM departments
    `);
}

function getRoles(){
    return connection.query(`select id,title from roles`)
}

module.exports ={
    getEmployees,
    getEmployeeNames,
    getDepartments,
    getRoles,
    connection
}