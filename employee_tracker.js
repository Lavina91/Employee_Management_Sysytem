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
                  'View All Employees By Roles', 'View All Departments', 'View All Roles', 'Add A New Department',
                  'Add A New Role', 'Add A New Employee', "Update An Employee's Role", 'Exit'
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
        
        res.map( ({id, name}) => {
            console.log(`
            Department ID: ${id} 
            Department Name: ${name}
                        `)
        } )

        start();
    })
};

const viewAllRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        
        res.map(({ id, title, salary, department_id }) => {
            console.log(`
            Role ID: ${id} 
            Title of Role: ${title}
            Salary: ${salary}
            Department ID: ${department_id}
                        `)
        })
        
        start();
    });
};

const viewAllEmployees = () => {
    connection.query('SELECT first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id', (err, res) => {
        if (err) throw err;
        res.map(({ id, first_name, last_name, title, name, manager_id }) => {
            console.log(`
            Employee ID: ${id} 
            First Name: ${first_name}
            Last Name: ${last_name}
            Role Title: ${title}
            Department: ${name}
            Manager ID ${manager_id}
                        `)
        })
        start();
    })
 };

const viewByDepartment = () => {

    connection.query('SELECT * FROM departments', (err, res) => {
        inquirer.prompt({
            type: 'rawlist',
            message: 'What department do you want to view?',
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].name);
                }
                return choiceArray;
            },
            name: 'depName'
        }).then((answer) => {

            let chosenDepart = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].name === answer.depName) {
                    let id = res[i]
                    chosenDepart.push(id)
                }
            }

            let query = "SELECT first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id WHERE departments.id = ? "
           
            connection.query(query, [chosenDepart[0].id], (err, res) => {
                if (err) throw err;

                res.forEach(( {first_name, last_name, salary, title, name, manager_id} ) => {
                    console.log(`
                                First Name: ${first_name}  
                                Last Name: ${last_name}
                                Salary: ${salary}
                                Title of position: ${title}
                                Department: ${name}
                                Manager ID: ${manager_id}`)
                })
            })
            start();
        });
            
    })
};

const viewByRole = () => {
    
    connection.query('SELECT * FROM role', (err, res) => {
        inquirer.prompt({
            type: 'rawlist',
            message: 'What role do you want to view?',
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].title);
                }
                return choiceArray;
            },
            name: 'roleName'
        }).then((answer) => {

            let chosenRole = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].title === answer.roleName) {
                    let id = res[i]
                    chosenRole.push(id)
                }
            }

            let query = "SELECT first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id WHERE role.id = ? "

            connection.query(query, [chosenRole[0].id], (err, res) => {
                if (err) throw err;

                res.forEach(({ first_name, last_name, salary, title, name, manager_id }) => {
                    console.log(`
                                First Name: ${first_name}  
                                Last Name: ${last_name}
                                Salary: ${salary}
                                Title of position: ${title}
                                Department: ${name}
                                Manager ID: ${manager_id}`)
                })
            })
            start();
        })
    });


















};


// ---------- ADD ---------------------------------


const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the department you will like to add to database?',
        name: 'newDepartmentName'
    }).then( (answer) => {
        connection.query(
            'INSERT INTO departments SET ?',
            {
                name: answer.newDepartmentName
            },
            function (err) {
                if (err) throw err;
                console.log('You created a new department!');
                start();
            }
        )
    })
 };

const addRole = () => { 

     connection.query ('SELECT * FROM departments', (err, res) => {
         if (err) throw err;

         const roleQuestions = [{
                                 type: 'input',
                                 message: 'What is the title of the role you would like to add?',
                                name: 'roleName'
                                },
                                {
                                    type:'input',
                                    message:'What is the salary of the new role?',
                                    name:'roleSalary'
                                },
                                {
                                type: 'rawlist',
                                message: 'What department do you want to add the new role to?',
                                choices: function () {
                                    let choiceArray = [];
                                    for (let i = 0; i < res.length; i++) {
                         choiceArray.push(res[i].name);
                     }
                     return choiceArray;
                 },
                 name: 'depRoleName'
             }
        ]

         inquirer.prompt(roleQuestions).then(function(answer) {
                
                let chosenDepart =[];
                for (let i =0; i < res.length; i++) {
                    if(res[i].name === answer.depRoleName) {
                        let id = res[i]
                        chosenDepart.push(id)
                    }
                }

               connection.query('INSERT INTO role SET ?',
               {
                   title: answer.roleName,
                   salary: answer.roleSalary,
                   department_id: chosenDepart[0].id
               }, (err) => {
                   if (err) throw err;
                   console.log('You successfully added a new role!')
                   start();
               })

            })
     })



};

const addEmployee = () => { 
    
    connection.query('SELECT * FROM departments', (err, res) => {

    let departQuestions = [
        {
            type: 'rawlist',
            message: 'What department do you want to add the new role to?',
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].name);
                }
                return choiceArray;
            },
            name: 'depRoleName'
        }];

    inquirer.prompt(departQuestions).then(function (answer) {

            let chosenDepart = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].name === answer.depRoleName) {
                    let id = res[i]
                    chosenDepart.push(id)
                }
            }

            connection.query('SELECT * FROM role WHERE role.department_id = ?', 
            [chosenDepart[0].id],
            (err, results) => {
                if (err) throw err;
                console.log(results)

                let employeeQuestions = [
                    {
                        type: 'input',
                        message:'What is the first name of the new employee?',
                        name: 'firstName'

                    },
                    {
                        type: 'input',
                        message: 'What is the last name of the employee?',
                        name: 'lastName'

                    },
                    {
                        type: 'rawlist',
                        message: 'What role do you want this employee to?',
                        choices: function() {
                            let roleArray = [];
                            for (let i = 0; i < results.length; i++) {
                                roleArray.push(results[i].title);
                            }
                            return roleArray;
                        },
                        name: 'employeeRole'
                    }];

                    inquirer.prompt(employeeQuestions).then(function(answer) {

                        let chosenRole = [];
                        for (let i = 0; i < results.length; i++) {
                            if (results[i].title === answer.employeeRole) {
                                chosenRole.push(results[i])
                            }
                        }


                        let managerId = [];
                            if ( answer.employeeRole === 'Manager') {
                                let id = 0
                                managerId.push(id)
                            }
                            else {
                               let id = results[0].id
                                managerId.push(id)
                            }

                       

                        connection.query('INSERT INTO employee SET ?',
                            {
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: chosenRole[0].id,
                                manager_id: managerId
                            }, (err) => {
                                if (err) throw err;
                                console.log('You successfully added a new role!')
                                start();
                            })

                    })
                })
            })
        })
    };



// ---------- UPDATE ------------------------------

const updateRole = () => { 

    // use UPDATE set ?(employee role) WHERE ?(employee name)

    // SELECT * from employees and prompt user which employee they want to choose 
    // AND what is the name of the new role 

    connection.query('SELECT first_name, last_name, salary, title, name, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN departments ON role.department_id = departments.id', (err, res) => {

        if (err) throw err;

        const updateQuestion = [
            {
                type: 'rawlist',
                message: 'What employee do you want to update?',
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + ' ' + res[i].last_name);
                    }
                    return choiceArray;
                },
                name: 'employeeName'
            },
            {
                type: 'input',
                message: 'What is the name of the updated role?',
                name: 'newRoleName'
            }
        ];

        inquirer.prompt(updateQuestion).then((answer) => {

            let chosenEmployee = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].first_name + ' ' + res[i].last_name == answer.employeeName) {
                    chosenEmployee.push(res[i])
                }
            }
            
            connection.query(
                "UPDATE employee INNER JOIN role ON employee.role_id = role.id SET ? WHERE ?", 
            [ 
                {
                    title: answer.newRoleName
                }, 
                { 
                    first_name: chosenEmployee[0].first_name,
                    last_name: chosenEmployee[0].last_name
                }
            ],
            (err, res) => {
                if (err) throw err;
                console.log("Successfully updated employee's role")
                start();
            })
        })
    })
}; // NEED TO WORK ON 



start();

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    
});
