const mysql = require("mysql");

const {viewEmployee, viewEmployeeByDepartment, viewRoles, viewDepartments}  = require("./viewtables.js");
const {addDepartment, addRole, addEmployee} = require("./addtotables.js");

const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysqlpassword",
    database: "employees_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id "+connection.threadId);
    promptUser();
})

function promptUser() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View ALL Employees by Department",
            "Add a department",
            "Add a role",
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
                viewEmployee();
                break;
            case "View ALL Employees by Department":
                viewEmployeeByDepartment();
                break;
            case "Add a department":
                addDepartment();
                break ;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
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
            case "View departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;

        }
    })
};