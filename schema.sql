DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Front End"),
("Back End"),
("Accounting"),
("HR"),
("Sales");


INSERT INTO roles (title, salary, department_id)
VALUES ("Jr. Developer", 70000, 1),
("Sr. Developer", 120000, 2),
("Accountant", 80000, 3),
("Sales Rep", 55000, 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Kevin", "Boyd", 4),
("Issac", "Orn", 1),
("Amy", "Carlson", 2),
("Ronald", "Swanson", 3),
("Josh", "Allen", 4),
("John", "Snow", 2);


