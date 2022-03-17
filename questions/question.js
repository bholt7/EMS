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

function addDepartment() {
  // questions for department information
  inquirer.prompt([{
    message: "What department would you like to add ?",
    name: "department"
  }])
  .then((answer) => {
    let query = 'INSERT TO department(name) VALUE (?)';
  })
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "manID",
        type: "input",
        message: "What is your manager ID?",
      },
    ])
    .then(function (answer) {
      var query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [answer.firstName, answer.lastName, answer.roleID, answer.manID],
        function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Employee: ${answer.firstName} ${answer.lastName}`);
            init();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
      {
        name: "departmentID",
        type: "input",
        message:
          "What is the Department ID for this new role? Please select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal.",
        choices: [1, 2, 3, 4],
      },
    ])
    .then(function (answer) {
      var query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(
        query,
        [answer.title, answer.salary, answer.departmentID],
        function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Role: ${answer.title}`);
            init();
          }
      )}
    )}