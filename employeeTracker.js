/*##############################################################
#  Dependencies
##############################################################*/

const queryHelper = require("./db/queryHelper.js");
const questions = require("./questions.js");
const cTable = require('console.table');


/*##############################################################
#  Global Variables
##############################################################*/


/*##############################################################
#  Helpers/Functions
##############################################################*/


// function which prompts the user for what action they should take
async function mainMenu() {

    const action = await questions.mainMenu();

    // based on their answer, call other functions
    switch(action.action){
        case "View All Employees":
            viewEmployees();
            break;
        case "View All Employees by Department":
            viewEmployees("Department");
            break;
        case "View All Employees by Manager":
            viewEmployees('Manager');
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Remove Employee":
            deleteEmployee();
            break;
        case "Add Role":
            addRole();
            break;
        case "Remove Role":
            deleteEmployee();
            break;
        case "Update Employee Role":
            postAuction();
            break;
        case "Update Employee Manager":
            postAuction();
            break;
        case "Exit":
            queryHelper.connection.end();
            break;
    }
}

// function to view emplyoees.  Set up for View By - All, Department, or Manager
async function viewEmployees(viewBy = ""){
    // extra data for more specific queries
    if(viewBy == "Department"){
        let department = await questions.getDepartment();
        viewBy = `where departments.name = '${department.name}'`;
    }
    else if (viewBy == "Manager"){
        let manager = await questions.getPerson();
        viewBy = `where employees.manager_id = '${manager.id}'`;
    }

    // run query for employees
    const data = await queryHelper.getEmployees(viewBy);
    // print to table
    console.table(data);
    //call back to main function
    mainMenu();
}

//Add employee call
async function addEmployee(){
    let employee = await questions.newEmployee();
    await queryHelper.addEmployee(employee);
    mainMenu();
}

// delete Employee
async function deleteEmployee(){
    let person = await questions.getPerson();
    await queryHelper.deleteEmployee(person.id);
    mainMenu();
}

// add Role
async function addRole(){
    let role = await questions.makeRole();
    await queryHelper.addRole(role);
    mainMenu();
}


function main(){
    try{
        mainMenu();
        //const data = await queryHelper.getEmployees();
        //console.table( data);

    }catch(err) {
        console.log(err)
    }
}

/*##############################################################
#  Main Code
##############################################################*/

main();
