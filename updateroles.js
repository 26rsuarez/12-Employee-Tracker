const mysql = require("mysql");
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
})


function getEmployees(){
    connection.query("SELECT employees.id, CONCAT(employees.first_name,\" \",employees.last_name) AS fullname FROM employees", function (err, res) {
    const employees=[];
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
        employees.push(res[i].fullname)
    }
    return employees;
})}



function getRoles(){
    connection.query("SELECT * FROM roles", function (err, res) {
        const roles=[];
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roles.push(res[i].title)
        }
        return roles;
    })
}


const updateRole = function () {
        getEmployees();
        inquirer.prompt({
            name: "employee",
            type: "rawlist",
            message: "Who do you want to update their role?",
            choices: employees
        }).then(function (result) {
            getRoles();
            employeeId = employees.indexOf(result.employee) + 1;
            inquirer.prompt({
                name: "role",
                type: "rawlist",
                message: "What is their new role?",
                choices: roles
            }).then(function (result) {
                roleid = roles.indexOf(result.role) + 1;
                connection.query("UPDATE employees SET ? where ?",
                    [{
                        role_id: roleid
                    }, {
                        employees_id: employeeId
                    }
                    ], function (err, res) {
                        if (err) throw err;
                    }
                )})})}

module.exports = {updateRole};