// need to require in Inquirer 

// need to create prompt questions to ask 

// ADD departments, employees and roles

// VIEW different departments, employees and roles

// UPDATE employee roles



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

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.end();
});