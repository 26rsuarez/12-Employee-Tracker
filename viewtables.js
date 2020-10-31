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

const viewEmployees = function(){
    console.log("testing");
    //this works on workbench but not on here why?? why do you do this javascript?? explain??
    const query = 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, CONCAT(mng.first_name," ",mng.last_name) as Manager FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments on roles.department_id = departments.id LEFT JOIN employees AS mng ON employees.manager_id = mng.id';
    connection.query(query, function(err, res){
        
        if (err) throw err;
        console.table(res);
    })
}
const viewEmployeeByDepartment = function(){
    // const query = "SELECT * FROM employees";
    // connection.query(query, function(err, res){
    //     if (err) throw err;
    //     console.table(res);
    // })
}
const viewRoles = function(){
    const query = "SELECT * FROM roles";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
    })
}
const viewDepartments = function(){
    const query = "SELECT * FROM departments";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
    })
}



module.exports = {viewEmployees, viewEmployeeByDepartment, viewRoles, viewDepartments};