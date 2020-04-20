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

module.exports = {
    mainMenu,
    getDepartment,
    getPersonID,
}