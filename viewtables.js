function viewEmployee(){
    const query = "SELECT * FROM employees";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log(res);
    })
}
function viewEmployeeByDepartment(){
    const query = "SELECT * FROM employees";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log(res);
    })
}
function viewRoles(){
    const query = "SELECT * FROM roles";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log(res);
    })
}
function viewDepartments(){
    const query = "SELECT * FROM departments";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log(res);
    })
}

module.exports = viewEmployee;
module.exports = viewEmployeeByDepartment;
module.exports = viewRoles;
module.exports = viewDepartments;