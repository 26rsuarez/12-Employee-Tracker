const inquirer = require("inquirer");

const mysql = require("mysql");

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



function promptUser() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee Roles",
            "View Departments",
            "View all roles"
        ]
    }).then(function(answer){
        switch (answer.action) {
            case "View All Employees":
                viewEmployees();
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
            case "Update Employee Roles":
                updateRole();
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


//these functions are used to view employees, roles, or departments

const viewEmployees = function(){
    
    const query = 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, CONCAT(mng.first_name," ",mng.last_name) as Manager FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments on roles.department_id = departments.id LEFT JOIN employees AS mng ON employees.manager_id = mng.id';
    connection.query(query, function(err, res){
        
        if (err) throw err;
        console.table(res);
        promptUser()
    })
}

const viewRoles = function(){
    const query = "SELECT * FROM roles";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        promptUser()
    })
}
const viewDepartments = function(){
    const query = "SELECT * FROM departments";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        promptUser()
    })
}


//this function updates a role
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

}

//this function prompts and adds a department to the schema
const addDepartment = function() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message:"What is the name of the deparment?"
    }).then(function(answer){
        connection.query("INSERT INTO departments SET ?", 
    {
        name: answer.department
    }
    , function(err, res){
        if (err) throw err;
        promptUser()
    }
    )})
}


//adds a role to the sql file
const addRole = function (){
    //we need to get the departments already available and store them for the choices
    connection.query("SELECT * FROM departments", function(err, res){
        const departments = [];
        if (err) throw err;
        for (let i=0; i<res.length; i++){
            departments.push(res[i].name)
        }
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
                //the departments are stored in the previous array so 
                //get their index to get the id (+1 because index starts at 0)
                const id = departments.indexOf(answer.department_id)+1;
                connection.query("INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: id,
                }, function(err, res){
                    if (err) throw err;
                    promptUser()
                })
            })
    })
}

const addEmployee = function(){
    connection.query("SELECT * FROM roles", function(err, res){
        //need to get the roles already available and store them
        const roles = [];
        if (err) throw err;
        for (let i=0; i<res.length; i++){
            roles.push(res[i].title)
        }
        const employees = ["NULL"]; //need the employees too for the manager choices
        connection.query("SELECT * FROM employees", function(err, res){
            if (err) throw err;
            for (let i=0; i<res.length; i++){
                fullName = res[i].first_name + " " + res[i].last_name;
                employees.push(fullName)
            }
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
                    //get the role id from the index of roles
                    const id = roles.indexOf(answer.role)+1;
                    //same for manager
                    let managerId=employees.indexOf(answer.manager);
                    //if they don't have a manager don't send data to that column
                    if (employees.indexOf(answer.manager)==0){
                        connection.query("INSERT INTO employees SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: id,
                    }, function(err, res){
                        if (err) throw err;
                    })
                    } else { //send all the data plus the manager
                        connection.query("INSERT INTO employees SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: id,
                        manager_id: managerId
                    }, function(err, res){
                        if (err) throw err;
                        promptUser()
                    })
                    }                 
                    
                })
        })
    })    
}


viewEmployees();