const connection = require("./connection.js");


//      Gets
//========================================================================
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
        SELECT id, name 
        FROM departments
    `);
}

function getRoles(){
    return connection.query(`select id,title from roles`)
}


//      Adds
//========================================================================
function addEmployee(person){
    return connection.query(`
        INSERT INTO employees SET ?`,
        {
            first_name:person.firstName,
            last_name:person.lastName,
            role_id:person.role,
            manager_id:person.manager?person.manager:null
        }
    )
}

function addRole(role){
    return connection.query(`
        INSERT INTO roles SET ?`,
        role
    )
}

//      Deletes
//========================================================================

function deleteEmployee(person){
    return connection.query(`
        DELETE FROM employees
        WHERE id = ?;
    `,
    [person]
    )
}

module.exports ={
    getEmployees,
    getEmployeeNames,
    getDepartments,
    getRoles,
    addEmployee,
    deleteEmployee,
    addRole,
    connection
}