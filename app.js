const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
const employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let employeeResponse = [];
let managerInfoN = [];
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
        message: "What is your employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's id?",
        name: "id"
    },
    {
        type: "input",

        message: "Please input their email address!",
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
                console.log(managerInfo);
                console.log("help")
                if (userData.role == true) {
                    employeeResponse.push(managerInfo)
                    newEmployee()
                }
            })
    }

let next =
    async function doNext() {
        await inquirer
            .prompt({
                type: "list",
                message: "WHat do you want to do now",
                name: "choice",
                choices: [
                    'Generate HTML',
                    'Add an Employee'
                ]
            })
            .then(async function (result) {
                if (result.choice == 'Add an Employee') {
                    employeeResponse.length = 0;
                    console.log("adding")
                    main()
                }
                if (result.choice === 'Generate HTML') {
                    console.log("generating")
                    console.log(employeeResponse)
                    render(employee)
                    //}
                }
            })
        }
                
                //)
                //};

                let main =
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
                        if (employeeResponse[0].title == "Engineer") {
                            buildEngineer()
                        }
                        if (employeeResponse[0].title == "Intern") {
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

                            const name = employeeResponse[0].name;
                            const id = employeeResponse[0].id;
                            const email = employeeResponse[0].email;
                            const role = employeeResponse[0].role;
                            const officeNumber = employeeResponse[0].officeNumber;

                            const managerNew = new manager(name, id, email, officeNumber)
                            managerInfoN.push(managerNew);
                            console.log("231")

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
                            employeeResponse[0].gituser = engineerAns.gitname;
                        })
                        .then(async function () {

                            const gitname = employeeResponse[0].gituser;
                            let queryURL = 'https://api.github.com/users/' + gitname;
                            axios
                                .get(queryURL).then(async function (response) {
                                    const engineerAns = {
                                        "github": response.data.login,
                                    }

                                    employeeResponse[0].gituser = engineerAns.github;

                                })
                        })
                    setTimeout(function () {
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
                            
                        );

                        fs.appendFileSync(
                        );

                        console.log('Your html file for the team page is in the output folder')
                    }

                // function call to initialize program
                init();