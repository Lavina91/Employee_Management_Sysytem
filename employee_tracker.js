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

inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees By Department', 
                  'View All Employees By Roles', 'View All Employees By Manager',
                  'View All Departments', 'View All Roles', 'Add A New Department',
                  'Add A New Role', 'Add A New Employee', "Update An Employee Role", 'Exit'
                ],
        name: 'userChoice'

     }).then( (answer) => {

        // choose what function to run depending on user input
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
    else if (answer.userChoice === 'Add A New Department') {
        addDepartment();
    }
    else if (answer.userChoice === 'Add A New Role') {
        addRole();
    }
    else if (answer.userChoice === 'Add A New Employee') {
        addEmployee();
    }
    else if (answer.userChoice === "Update An Employee's Role") {
        updateRole();
    }
    else {
        connection.end();
    }

})


 };


// ----------- VIEW ------------------------------

const viewAllDepartments = () => { 

    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.log(res)
        start();
    })
};

const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.log(res)
        start();
    });
};

const viewAllEmployees = () => {
 
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
