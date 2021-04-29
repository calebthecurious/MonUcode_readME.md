const fs = require("fs");
const inquirer = require("inquirer");
const choices = require("inquirer/lib/objects/choices");
const { report } = require("process");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile)

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "author",
            message: "What is the author's name?"
        }, 
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        }, 
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        }, 
        {
            type: "input",
            name: "title",
            message: "What is the project title?"
        }, 
        {
            type: "input",
            name: "description",
            message: "Please write a brief description of the project:"
        }, 
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
        },
        {
            type: "input",
            name: "installations",
            message: "What command should be run to install dependencies?"
        },  
        {
            type: "input",
            name: "tests",
            message: "What command should be run to run tests?"
        }, 
        {
            type: "input",
            name: "usage",
            message: "What does the user need to know about using the repository?"
        }, 
        {
            type: "input",
            name: "contribute",
            message: "What does the user need to about contributing to the repository?"
        }, 
    ])
}

function generateMD(response){
    if(response.license == "MIT"){
        response.license = "[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)]"
    } else if(response.license == "APACHE 2.0"){
        response.license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]"
    } else if(response.license == "GPL 3.0"){
        response.license = "[![License:GPL v3](https://img.shields.io/badge/License=GPLv3-blue.svg)]"
    } else if(response.license == "BSD 3"){
        response.license = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)]"
    } else{
        response.license = "None"
    }

    return`# ${response.title}

${response.description}

## Table of Contents
The table of contents makes it easy for users to find what they need.
- [Installation](#Installations)
- [Usage](#Usage)
- [License](#License)
- [Contributions](#Contributing)
- [Test](#Tests)
- [Question](#Questions)

### Installations:
This is the instructopm tp install this project:
\`\`\`${response.installations}\`\`\`

### Usage:
${response.usage}

### License:
This project is license under:
${response.license}

### Contributing:
${response.contribute}

### Tests:
In order to test, open the console and run the following:
\`\`\`${response.tests}\`\`\`

### Questions:
If you have any questions please contact me on [GitHub](https://github.com/${response.username}) or contact ${response.author} at ${response.email}

![picture](https://github.com/${response.username}.png? size=80)
`
}

promptUser().then(function(response){
    const markdown = generateMD(response);
    return writeFileAsync("./generated/generatedREADME.md", markdown);
}).then(function () {
    console.log("Generating README.md ...");
}).catch(function(err){
    console.log(err)
})