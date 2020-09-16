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
        message: "Would you like to add an employee to your team?",
        choices: ["Yes", "No"],
        default: "No"
    },

    {
        type: "list",
        message: "What is your role?",
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
        message: "What is your employee\'s name",
        name: "name",
        when: (answers) => answers.startApp === "Yes"
    },
    {
        message: "Please enter your id",
        name: "id",
        when: (answers) => answers.startApp === "Yes"
    },
    {
        message: "Please enter your email",
        name: "email",
        when: (answers) => answers.startApp === "Yes"
    },
    {
        message: "Please enter your school",
        name: "school",
        when: (answers) => answers.role === "Intern"
    },
    {
        message: "Please enter your GitHub username.",
        name: "github",
        when: (answers) => answers.role === "Engineer"
    },
    {
        message: "Please enter your office number.",
        name: "officeNumber",
        when: (answers) => answers.role === "Manager"
    }
];
const teamMembers = [];

function init() {
    inquirer.prompt(questions).then(answers => {
        console.log(answers);
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
        console.log(render(teamMembers));
        fs.writeFile("output/team.html", render(teamMembers), function(err) {
            if (err) throw err;
            console.log('Updated!');

        });
    })
};

init();