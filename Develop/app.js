const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [

    {
        type: "list",
        name: "startApp",
        message: "Would you like to add an employee to your team?:",
        choices: ["Yes", "No"],
        default: "No"
    },

    {
        type: "list",
        message: "What is the employee's role?:",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ],
        default: "Intern",
        when: (answers) => answers.startApp === "Yes"
    },
    {
        message: "What is the employee\'s name?:",
        name: "name",
        when: (answers) => answers.startApp === "Yes"
    },
    {
        message: "Please enter the employee\'s id:",
        name: "id",
        when: (answers) => answers.startApp === "Yes"
    },
    {
        message: "Please enter the employee\'s email:",
        name: "email",
        when: (answers) => answers.startApp === "Yes"
    },
    {
        message: "Please the employee\'s school:",
        name: "school",
        when: (answers) => answers.role === "Intern"
    },
    {
        message: "Please enter the employee\'s GitHub username:",
        name: "github",
        when: (answers) => answers.role === "Engineer"
    },
    {
        message: "Please enter the employee\'s office number:",
        name: "officeNumber",
        when: (answers) => answers.role === "Manager"
    }
];
const teamMembers = [];

function init() {
    inquirer.prompt(questions).then(answers => {

        if (answers.startApp === "No") {
            return;
        } else if (answers.role === "Intern") {
            let { name, id, email, school } = answers;
            const employee = new Intern(name, id, email, school);
            teamMembers.push(employee);

        } else if (answers.role === "Engineer") {
            let { name, id, email, github } = answers;
            const employee = new Engineer(name, id, email, github);
            teamMembers.push(employee);

        } else if (answers.role === "Manager") {
            let { name, id, email, officeNumber } = answers;
            const employee = new Manager(name, id, email, officeNumber);
            teamMembers.push(employee);
        }

        init();

    }).then(() => {

        fs.writeFile("output/team.html", render(teamMembers), function(err) {
            if (err) throw err;

        });
    })
};

init();