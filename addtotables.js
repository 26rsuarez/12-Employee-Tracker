const inquirer = require("inquirer");


function addDepartment(){
    inquirer.prompt({
        name: "department",
        type: "input",
        message:"What is the name of the deparment?"
    }).then(function(answer){
        connection.query("INSERT INTO departments SET ?",
        {
            name: answer.name
        }, function(err, res){
            if (err) throw err;
        })
    })
}

function addRole(){
    const departments = [];
    connection.query("SELECT * FROM departments", function(err){
        if (err) throw err;
        for (let i=0; i<res.length; i++){
            departments.push(res[i].name)
        }
    })
    inquirer.prompt([
    {
    name: "title",
    type: "input",
    message:"What is the title of the role?"
    },
    {
    name: "salary",
    type: "number",
    message:"What is the salary of the role?"
    },
    {
    name: "department_id",
    type: "rawlist",
    message:"Which department is the role under?",
    choices: departments
    },
    ]
        
    ).then(function(answer){
        connection.query("INSERT INTO departments SET ?",
        {
            title: answer.title,
            salary: answer.salary,
            department_id = departments.indexOf(answer.departments)+1
        }, function(err, res){
            if (err) throw err;
        })
    })
}

function addEmployee(){
    const roles = [];
    connection.query("SELECT * FROM roles", function(err){
        if (err) throw err;
        for (let i=0; i<res.length; i++){
            roles.push(res[i].title)
        }
    })

    const employees = [];
    connection.query("SELECT * FROM employees", function(err){
        if (err) throw err;
        for (let i=0; i<res.length; i++){
            fullName = res[i].first_name + " " + res[i].last_name;
            employees.push(fullName)
        }
    })

    inquirer.prompt([
    {
    name: "first_name",
    type: "input",
    message:"What is the employee's first name?"
    },
    {
    name: "last_name",
    type: "input",
    message:"What is the employee's last name?"
    },
    {
    name: "role",
    type: "rawlist",
    message:"What is the employees role?",
    choices: roles
    },
    {
    name: "manager",
    type: "rawlist",
    message:"Who is the employee's manager?",
    choices: employees
    },
    ]
        
    ).then(function(answer){
        connection.query("INSERT INTO employees SET ?",
        {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role: departments.indexOf(answer.departments)+1,
            manager: answer.manager
        }, function(err, res){
            if (err) throw err;
        })
    })
}

module.exports = addDepartment;
module.exports = addRole;
module.exports = addEmployee;