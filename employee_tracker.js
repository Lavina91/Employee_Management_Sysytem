const inquirer = require('inquirer')
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port, if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'luigi2002!@#',
    database: 'employee_trackerDB',
});




// functions needed to be created 
const start = () => {
    // prompt the user 'What would you like to do?' // type:list
// view all employees
// ALSO by department 
// Add employees
// Update employee roles 

inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees By Department', 
                  'View All Employees By Roles', 'View All Employees By Manager',
                  'View All Departments', 'View All Roles', 'Add A New Department',
                  'Add A New Role', 'Add A New Employee', "Update An Employee Role"
                ],
        name: 'userChoice'

     }).then( (answer) => {

    if (answer.userChoice === 'View All Employees') {
        viewAllEmployees();
    }
    else if (answer.userChoice === 'View All Employees By Department') {
        viewByDepartment();
    }
    else if (answer.userChoice === 'View All Employees By Roles') {
        viewByRole();
    }
    else if (answer.userChoice === 'View All Employees By Manager') {
        viewByManger();
    }
    else if (answer.userChoice === 'View All Departments') {
        viewAllDepartments();
    }
    else if (answer.userChoice === 'View All Roles') {
        viewAllRoles();
    }
    if (answer.userChoice === 'Add A New Department') {
        addDepartment();
    }
    if (answer.userChoice === 'Add A New Role') {
        addRole();
    }
    if (answer.userChoice === 'Add A New Employee') {
        addEmployee();
    }
    if (answer.userChoice === "Update An Employee's Role") {
        updateRole();
    }

})





 };


// ----------- VIEW ------------------------------

const viewAllDepartments = () => { 
    // different departments
    
    // 1. Sales
    // 2.Engineering 
    // 3.Finance 
    // 4.Legal

    // display all departments
    // SELECT * FROM departments

    console.log('Inside Function');
};

const viewAllRoles = () => {
    console.log('Inside Function'); 
    // different Roles

    // 1. Sales
      // a. Sales Manger
      // b. Sales Leads
      // c. Salesperson

    // 2.Engineering
      // a. Engineer Manager 
      // b. Lead Engineer 
      // c. Junior Engineer 
      
    // 3.Finance
      // a. Account Manager
      // b. Lead Accountant
      // c. Accountant
    
    // 4.Legal
      // a.Legal Team Manger 
      // b. Legal Team Lead
      // c. Lawyer

    // display all roles
    // SELECT * FROM role
};

const viewAllEmployees = () => {
    console.log('Inside Function');
    // display all employees 
    // SELECT * FROM employee
 };

const viewByDepartment = () => {
    console.log('Inside Function');
    // get the data from what department user chose to view

    // AND SELECT answer FROM departments 
};

const viewByRole = () => {
    // get the data from what role user chose to view

    // AND SELECT answer FROM role
};

const viewByManger = () => {
    // get the data from what employee user chose to view by manager id

    // AND SELECT answer FROM employee
};


// ---------- ADD ---------------------------------


const addDepartment = () => {
    // get the department name 

    // use INSERT INTO departments SET ?
 };

const addRole = () => { 
    // need the following info 
    // 1. role title 
    // 2. salary 
    // 3. department id

     // use INSERT INTO role SET ?
};

const addEmployee = () => { 
       // need the following info 
    // 1. first name
    // 2. last name 
    // 3. role id 
    // 4. manager id

     // use INSERT INTO employee SET ?
};

// ---------- UPDATE ------------------------------

const updateRole = () => { 

    // use UPDATE set ?(employee role) WHERE ?(employee name)
};


start();

connection.connect((err) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);
    
});
