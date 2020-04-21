const inquirer = require ("inquirer");
const queryHelper = require("./db/queryHelper.js");

function mainMenu(){
    return inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
    });
}

async function getDepartment(){
    const data = await queryHelper.getDepartments();

    return inquirer.prompt({
        name: "department",
        type: "list",
        message: "Which Department?",
        choices: data.map(dept=>dept.name)
    });
}

async function getPersonID(){
    // get list of all employee names/ids
    const data = await queryHelper.getEmployeeNames();

    // display all names as choices
    const inq = await inquirer.prompt({
        name: "person",
        type: "list",
        message: "Which Manager?",
        choices: data.map(person=>person.name)
    });

    // return the id associated with the given name
    return data.find(person => person.name == inq.person).id;
}

async function getPersonID(){
    // get list of all employee names/ids
    const data = await queryHelper.getEmployeeNames();

    // display all names as choices
    const inq = await inquirer.prompt({
        name: "person",
        type: "list",
        message: "Which person?",
        choices: data.map(person=>person.name)
    });

    // return the id associated with the given name
    return data.find(person => person.name == inq.person).id;
}

// gather all the data for a new employee
async function newEmployee(){
    // get list of all employee names/ids
    const names = await queryHelper.getEmployeeNames();
    const roles = await queryHelper.getRoles();

    // display all names as choices
    const inq = await inquirer.prompt([
        {
            name:"firstName",
            message: "What is their first name?",
        },
        {
            name:"lastName",
            message: "What is their last name?",
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: roles.map(role=>role.title)
        },
        {
            name: "manager",
            type: "list",
            message: "Who is their Manager?",
            choices: [...names.map(person=>person.name),"None"]
        }
    ]);
    
    let managerId;
    try{
        managerId = names.find(person => person.name == inq.manager).id;
    }
    catch{managerId = null}

    let roleId =  roles.find(role => role.title == inq.role).id;

    let person = {firstName:inq.firstName, lastName:inq.lastName, role:roleId, manager:managerId};
    console.log(person);
    return person;
}

module.exports = {
    mainMenu,
    getDepartment,
    getPersonID,
    newEmployee
}