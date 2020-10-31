const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysqlpassword",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
})


const updateRole = function () {
    const employeesArr = [];
    const rolesArr = [];
    let pickedEmployee =  "";
    connection.query("SELECT * FROM employees", function (err, res) {

        for (let i = 0; i < res.length; i++) {
            employeesArr.push(res[i].first_name + " " + res[i].last_name)
        }

        inquirer
            .prompt([

                {
                    type: 'list',
                    name: 'employees',
                    message: 'What employee do you want to change?',
                    choices: employeesArr,
                },
            ])
            .then((answers) => {
                console.log(answers.employees);
                pickedEmployee = answers.employees;


            }).then(() => {
                connection.query("SELECT * FROM roles", function (err, res) {

                    for (let i = 0; i < res.length; i++) {
                        rolesArr.push(res[i].title)
                    }
            
                    inquirer
                        .prompt([
            
                            {
                                type: 'list',
                                name: 'role',
                                message: "What is their new role?",
                                choices: rolesArr,
                            },

                        ])
                        .then(function (result) {
                            employeeId = employeesArr.indexOf(pickedEmployee) + 1;
                            roleid = rolesArr.indexOf(result.role) + 1;
                            connection.query("UPDATE employees SET ? where ?",
                                [{
                                    role_id: roleid
                                }, {
                                    id: employeeId
                                }], 
                                function (err, res) {
                                        if (err) throw err;
                                    }
                                )});
                })
            });
    })

 

   



    //this functions return an array, but the array is not showing up in the choices???
    // 
    //     

    //         if (err) throw err;
    //         
    //         }}).
    //         
    //         })
}

module.exports = { updateRole };