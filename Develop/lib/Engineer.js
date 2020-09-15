const Employee = require("./Employee");
// var githubLink;
// const axios = require("axios");
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.role = "Engineer";
    }
    getRole() {
        return this.role;
    }
    getGithub() {
        return this.github;
    }

}

// function getUserName(username) {
//     axios.get('https://api.github.com/users/' + username)
//         .then(function(response) {
//             console.log(response.data.login);
//             githubLink = response.data.url;
//             console.log(response.data.url);
//         });
//     return githubLink;
// }
module.exports = Engineer;
// module.exports = { getUserName };