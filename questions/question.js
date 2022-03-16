const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
const connection = require('../db/connection');
const Choices = require('inquirer/lib/objects/choices');

function init() {
  inquirer.prompt({
    message: "What would you like to do ?",
    name: "options",
    type: "list",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Exit"
      ]

  })
  .then((answer)=>{
    if(answer.options === "View all Departments") viewDepartments();

    if(answer.options === "View all Roles") viewRoles();

    if(answer.options ===  "View all Employees") viewEmployees();

    if(answer.options === "Add a Department" ) addDepartment();

    if(answer.options === "Add a Role" ) addRole();

    if(answer.options === "Add an Employee" ) addEmployee();

    if(answer.options === "Exit" ) leave();

  })
}

function viewDepartments(){
  let query = 'SELECT name, id FROM employee_db.department ORDER BY id asc';
  connection.query(query, (err, res)=> {
    console.table(res);
    init();
  })
}

function viewRoles(){
  let query = 'SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id';
  connection.query(query, (err, res)=> {
    console.table(res);
    init();
  })
}

function viewEmployees(){
  let query = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id';
  connection.query(query, (err, res)=> {
    console.table(res);
    init();
  })
}