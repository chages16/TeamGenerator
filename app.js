const manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
var employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let employeeResponse =[];
let managerInfoN =[];
let engineerData = [];
let internData = [];


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const startupQuestions = [
    {
        type: "input",
        message: "Hi, please input your name here",
        name: "name"
    },
    {
        type: "input",
        message: "Please input your ID",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },
    {
        type: "confirm",
        message: "Are you the manager of this project?",
        name: "role",
    }
];

const employeeQ = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's id number?",
        name: "id"
    },
    {
        type: "input",
        message: "Please input their email address?",
        name: "email"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "title",
        choices: [
            'Engineer',
            'Intern'
        ]
    }
];

const managerQ = [
    {
        type: "input",
        message: "What is your office phone number?",
        name: "officeNumber"
    }

];

const engineerQ = [
    {
        type: "input",
        message: "What is the employee's GitHUb username?",
        name: "gituser"
    }

];

const internQ = [
    {
        type: "input",
        message: "What school did the employee go to?",
        name: "schoolname"
    }

];

let init =
    async function collectData() {

        await inquirer
            .prompt(startupQuestions)

            .then(async function (userData) {
                let managerInfo = {
                    'name': userData.name,
                    'id': userData.id,
                    'email': userData.email,
                    'role': userData.role,
                    'title': 'manager',
                    'officeNumber': '',
                    'gitprofile': '',
                }
                console.log (managerInfo)       ;
                console.log("help")
                if (userData.role == true) {
                    employeeResponse.push(managerInfo)
                    newEmployee()
                }
            })
    }

let next =
    async function adminNext() {
       /*  await inquirer
            .prompt(adminChoices)
            .then(async function (answers) {
                if (answers.adminchoice === 'Add an employee?') {
                    employeeQ.length = 0;
                    input()
                }
                if (answers.adminchoice === 'Create the team HTML page?') { */
                    input()
                //}
            }
            //)
    //};

let input =
    async function init() {
        await inquirer
            .prompt(employeeQ)

            .then(async function (userData) {
                let userInfo = {
                    'name': userData.name,
                    'id': userData.id,
                    'email': userData.email,
                    'role': 'employee', // DEFAULT
                    'title': userData.title,
                    'officeNumber': '',
                    'gitname': '',
                    'github': '',
                    'school': ''
                }
                console.log(userInfo)
                employeeResponse.push(userInfo)
                newEmployee()
            })
    };

let newEmployee =
    async function employeeprofile() {
        await inquirer
        console.log(employeeResponse)
        const name = employeeResponse[0].name;
        const id = employeeResponse[0].id;
        const email = employeeResponse[0].email;
        const role = employeeResponse[0].role;
        const employeeNew = new employee(name, id, email, role)
        console.log(employee)
        console.log(employeeNew)
        classdir()
    };

let classdir =
    async function bytitle() {
        console.log("hi")

        if (employeeResponse[0].title == "manager") {
            buildManager()
        }
        if (employeeResponse[0].title == "engineer") {
            buildEngineer()
        }
        if (employeeResponse[0].title == "intern") {
            buildIntern()
        }
    };

async function buildManager() {

    await inquirer
        .prompt(managerQ)

        .then(async function (userData) {
            let managerAns = {
                'officeNumber': userData.officeNumber
            }
            employeeQ[0].officeNumber = managerAns.officeNumber;

            const name = employeeQ[0].name;
            const id = employeeQ[0].id;
            const email = employeeQ[0].email;
            const role = employeeQ[0].role;
            const officeNumber = employeeQ[0].officeNumber;
        
            const managerNew = new manager(name, id, email, officeNumber)
            managerInfoN.push(managerNew);

        })

    next()
};

async function buildEngineer() {
    await inquirer
        .prompt(engineerQ)

        .then(async function (userData) {
            let engineerAns = {
                'gitname': userData.gituser
            }
            employeeQ[0].gitname = engineerAns.gituser;
        })
        .then(async function() {

            const gitname = employeeQ[0].gitname;
            let queryURL = 'https://api.github.com/users/' + gituser;
            axios
                .get(queryURL).then(async function (response) {
                    const engineerAns = {
                        "github": response.data.login,
                    }
        
                    employeeQ[0].github = engineerAns.gituser;
                    
                })
        })
                        setTimeout(function(){
                        const name = employeeQ[0].name;
                        const id = employeeQ[0].id;
                        const email = employeeQ[0].email;
                        const role = employeeQ[0].role;
                        const gitname = employeeQ[0].gitname;
                        const github = employeeQ[0].github;
                    
                        const engineerNew = new engineer(name, id, email, gitname, github)
             
                        engineerData.push(engineerNew)
                        }, 2000);
                    
next()
};

async function buildIntern() {
    await inquirer
        .prompt(internQ)

        .then(async function (userData) {
            let internData = {
                'school': userData.school
            }
            employeeQ[0].school = Data.school;
        })
        const name = employeeQ[0].name;
        const id = employeeQ[0].id;
        const email = employeeQ[0].email;
        const role = employeeQ[0].role;
        const school = employeeQ[0].school;

    const internNew = new intern(name, id, email, school);
    internData.push(internNew)
    next()
};

createteam =
    async function teamHTML() {


        fs.writeFileSync('./output/teampage.html',
            '<DOCTYPE! HTML>' +
            '<html>' +
            '<head>' +
            '<meta charset="UTF-8">' +
            '<link rel="stylesheet" type="text/css" href="style.css">' +
            '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0"/> ' +
            '<meta http-equiv="X-UA-Compatible" content="ie=edge" />' +
            '</head>' +
            '<body>' +
            '<header>' +
            '<h1>' + 'Company Team Page' + '</h1>' +
            '</header>' +
            '<container>' +
            '<div class="row">' +
            '<div class="col-sm-10">'
        );

        fs.appendFileSync('./output/teampage.html',
            '<div id="manager">' +
            '<div class="card">' +
            '<div class="card-header bg-info">' + managerArr[0].name + '</div>' +
                '<div class="card-body">' +
                    '<div class=content>' +

                    '<p>' + "ID: " + managerArr[0].id + '</p>' + '<hr>' +
                    '<p>' + "Email: " + managerArr[0].email + '</p>' + '<hr>' +
                    '<p>' + "Office Number: " + managerArr[0].officeNumber + '</p>' + '<hr>' +

                    '</div>' +
                '</div>' +
            '<div class="card-footer bg-info">' + "Manager" + '</div>' +
            '</div>' +
            '</div>'
        );

        for (i = 0; i < engineerArr.length; i++) {
            fs.appendFileSync('./output/teampage.html',
                '<div id="engineer">' +
                '<div class="card">' +
                '<div class="card-header bg-primary">' + engineerArr[i].name + '</div>' +
                '<div class="card-body">' +
                '<div class=content>' +

                '<p>' + "ID: " + engineerArr[i].id + '</p>' + '<hr>' +
                '<p>' + "Email " + engineerArr[i].email + '</p>' + '<hr>' +
                '<p>' + "GitHub username: " + engineerArr[i].gitname + '</p>' + '<hr>' +

                '</div>' +
                '</div>' +
                '<div class="card-footer bg-primary">' + 'Engineer' + '</div>' +
                '</div>' +
                '</div>'
            );
        }

        for (i = 0; i < internArr.length; i++) {
            fs.appendFileSync('./output/teampage.html',
                '<div id="intern">' +
                '<div class="card">' +
                '<div class="card-header bg-success">' + internArr[i].name + '</div>' +
                '<div class="card-body">' +
                '<div class=content>' +

                '<p>' + "ID: " + internArr[i].id + '</p>' + '<hr>' +
                '<p>' + "Email: " + internArr[i].email + '</p>' + '<hr>' +
                '<p>' + "School: " + internArr[i].school + '</p>' + '<hr>' +

                '</div>' +
                '</div>' +
                '<div class="card-footer bg-success">' + 'Intern' + '</div>' +
                '</div>' +
                '</div>'
            );
        }

        fs.appendFileSync('./output/teampage.html', 
            '</div>' +
            '</div>' +
            '</container>' +
            '</body>' +
            '</html>'
        );

        console.log('Your html file for the team page is in the output folder')
    }

// function call to initialize program
init();