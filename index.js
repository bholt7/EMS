const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
const connection = require('./db/connection');

// initializing function that contains the wwyltd prompt
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
      "Update an Employee",
      "Exit"
      ]

  })
  .then((answer)=>{ // conditions based on the answer of the prompt above
    if(answer.options === "View all Departments") viewDepartments();

    if(answer.options === "View all Roles") viewRoles();

    if(answer.options ===  "View all Employees") viewEmployees();

    if(answer.options === "Add a Department" ) addDepartment();

    if(answer.options === "Add a Role" ) addRole();

    if(answer.options === "Add an Employee" ) addEmployee();

    if(answer.options === "Update an Employee") updateEmployee();

    if(answer.options === "Exit" ) leave();

  })
}
// function that displays all of the departments in table format
function viewDepartments(){
  let query = 'SELECT name, id FROM employee_db.department ORDER BY id asc'; // grabbing the table and columns i want displayed
  connection.query(query, (err, res)=> {
    console.table(res);// displays the response in table format
    init();
  })
}
function viewRoles() { // same as above just with roles
  let query ='SELECT roles.title, roles.salary, department.name FROM employee_db.roles, department WHERE department.id = roles.department_id';
  connection.query(query,  (err, res)=> {
    console.table(res);
    init();
  });
}

 function viewEmployees() { // same as above just with employees
   let query = 'SELECT employee.first_name, employee.last_name, roles.title FROM employee_db.employee, roles WHERE employee.id = roles.id';
  connection.query(query, (err, res)=> {
    console.table(res);
    init();
   });
 }


function addDepartment() { // gives the user the ability to dynamically insert data into the department table
  inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUE (?)";
      connection.query(query, answer.department, (err, res)=> {
        err ? console.error(err) :
        console.log(`Successfully Added Department!`);
        init();
      });
    });
}
 
function addRole() { // gives the user the ability to dynamically insert data into the roles table
  inquirer.prompt([
    {
      message: "What is the new role ?",
      name:"newRole"
    }, 
    {
      message:"Annual Salary ?",
      name: "salary"
    }, 
    {
      message: "What is the department ID of this new role ?",
      name: "departmentid",
      type: "list",
      choices: [1, 2, 3, 4]
    }
  ])
  .then((answer)=>{
    let query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    connection.query(query,[answer.newRole, answer.salary, answer.departmentid], (err, res) => {
      err ? console.error(err) : console.log(`successfully added ${answer.newRole}`)
      init();
    })
  })
}

function addEmployee () { // gives the user the ability to dynamically insert data into the employee table
  inquirer.prompt([
    {
      message: "What is the employee's first name ?",
      name: "first"
    }, 
    {
      message: "What is the employee's last name ?",
      name: "last"
    }, 
    {
      message: "What is the employee's role id ?",
      name: "roleid"
    }, 
    {
      message: "What is the manager id ?",
      name: "managerid"
    }
  ])
  .then((answer)=> {
    let query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [answer.first, answer.last, answer.roleid, answer.managerid ], (err, res) => {
      err ? console.error(err) : console.log(`Successfully added employee ${answer.first}`);
      init()
    })
  })
}

function updateEmployee() {
  inquirer.prompt([
    {
      message: "What is the employee's id",
      name: "employeeid"
    }, 
    {
      message: "What is the employee's new role",
      name: "employeeRole"
    }, 
    {
      message: "What is there new department ?",
      name: "newdepartment",
      type: "list",
      choices: [1,2,3,4]
    }, 
    {
      message:"What is the employee's new salary ?",
      name: "newsal"
    }
  ])
  .then((answer)=>{
    let query = 'UPDATE roles SET title = ?, salary = ?, department_id = ? WHERE id = ?';
    connection.query(query, [answer.employeeRole, answer.newsal, answer.newdepartment, parseInt(answer.employeeid)], (err,res)=>{
      err ? console.error(err) : console.log('Successful')
      init();
    })
  })
}

function leave(){
  process.exit
}

init();