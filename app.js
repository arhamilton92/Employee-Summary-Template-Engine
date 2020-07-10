const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [
        {
            type: "input",
            name: "Employee First Name",
            message: "Employee Name:",
        },
        {
            type: "input",
            name: "email",
            message: "Email:",
        },
        {
            type: "input",
            name: "id",
            message: "ID number:",
        },
        {
            type: "list",
            name: "role",
            message: "Role:",
            choices: [ 
                "Intern", new inquirer.Separator(), 
                "Engineer", new inquirer.Separator(), 
                "Manager", new inquirer.Separator(),
            ],
        },
        {
            type: "input",
            name: "school",
            message: "School:",
            when: (response) => response.role == "Intern",
        },
        {
            type: "input",
            name: "github",
            message: "github username:",
            when: (response) => response.role == "Engineer",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office number:",
            when: (response) => response.role == "Manager",
        },
        {
            type: "list",
            name: "continue",
            message: "Add another employee?",
            choices: [ 
                "Yes", new inquirer.Separator(), 
                "No", 
            ],
        },
]



init = () => {
    //intro
    console.log("-----------------------");
    console.log("Hello! Let's get your team added to the company database.");
    console.log("Please fill out the following prompts:");
    console.log("-----------------------");
    //use the inquirer package
    inquirer
        //.prompt uses the questions array to ask the user questions
        .prompt(questions)
        .then((response) => {
            generateEmployee(response);
            if (response.continue == "Yes") {
                init();
            }else {
                console.log("Team list completed!")
                finishPrompts();
                fs.writeFile(outputPath, render(employees), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                })
            }
        })
}

function getEmployees(name, callback) {
    let result = await con.query('your query', []);
    console.log(result)
    const user = new User(result[0]);
    return user;
}


finishPrompts() {
    inquirer.prompt
}

generateEmployee = (response) => {
    let newEmployee = "";
    let uniqueParameter = "";
    let role = "";
    if (response.role == "Intern") {
        uniqueParameter = response.school;
        role = Intern;
    } if (response.role == "Engineer") {
        uniqueParameter = response.github;
        role = Engineer;
    } if (response.role == "Manager") {
        uniqueParameter = response.officeNumber;
        role = Manager;
    }
    newEmployee = new role(
        response.name,
        response.id,
        response.email,
        uniqueParameter,
    );
    employees.push(newEmployee)
    console.log(employees);

    
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

init();


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
