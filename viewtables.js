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
    const query = "SELECT * FROM employees";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("Please work")
        console.table(res);
    })
}
const viewEmployeeByDepartment = function(){
    const query = "SELECT * FROM employees";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
    })
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