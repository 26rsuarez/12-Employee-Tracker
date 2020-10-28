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


const updateRole = function () {
    //this functions return an array, but the array is not showing up in the choices???
    const employeesArr=[];
        connection.query("SELECT * FROM employees", function (err, res) {
            
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                employeesArr.push(res[i].first_name+" "+res[i].last_name)
            }})
        inquirer.prompt({
            name: "employee",
            type: "rawlist",
            message: "Who do you want to update their role?",
            choices: employeesArr
        }).then(function (result) {
            
            employeeId = employeesArr.indexOf(result.employee) + 1;
            const rolesArr = [];
            connection.query("SELECT * FROM roles", function (err, res) {
            
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                rolesArr.push(res[i].title)
            }})
            inquirer.prompt({
                name: "role",
                type: "rawlist",
                message: "What is their new role?",
                choices: rolesArr
            }).then(function (result) {
                roleid = rolesArr.indexOf(result.role) + 1;
                connection.query("UPDATE employees SET ? where ?",
                    [{
                        role_id: roleid
                    }, {
                        employees_id: employeeId
                    }
                    ], function (err, res) {
                        if (err) throw err;
                    }
                )})
            })
}

module.exports = {updateRole};