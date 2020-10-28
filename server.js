const {addDepartment, addRole, addEmployee} = require("./addtotables.js");
const {viewEmployees, viewEmployeeByDepartment, viewRoles, viewDepartments} = require("./viewtables.js")

const inquirer = require("inquirer");



function promptUser() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View ALL Employees by Department",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Remove an Employee",
            "Update Employee Roles",
            "Update Employee Manager",
            "View Departments",
            "View all roles"
        ]
    }).then(function(answer){
        switch (answer.action) {
            case "View ALL Employees":
                viewEmployees();
                break;
            case "View ALL Employees by Department":
                viewEmployeeByDepartment();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Remove an Employee":
                removeEmployee();
                break;
            case "Update Employee Roles":
                updateRole();
                break;
            case "Update Employee Manager":
                updateManager();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;

        }
    })
};

promptUser();