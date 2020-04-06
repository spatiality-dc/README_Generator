const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "title",
      message: "Please enter a project title.",
    },
    {
      type: "input",
      name: "description",
      message: "Please enter a description of this project.",
    },
    {
      type: "input",
      name: "install",
      message: "Please enter any notes about installation.",
    },
    {
      type: "input",
      name: "usage",
      message: "Please enter any comments about usage of this project.",
    },
    {
      type: "checkbox",
      name: "license",
      message: "Which license would you like to use for this project?",
      choices: ["ISC", "MIT", "Creative Commons"],
    },
    {
      type: "input",
      name: "contributing",
      message: "Who contributed to this project?",
    },
    {
      type: "input",
      name: "testing",
      message: "Please enter comments about testing for this project.",
    },
    {
      type: "input",
      name: "questions",
      message:
        "Please enter frequently asked questions - and their answers -  about this projet.",
    },
  ]);
}

function getLicenseBadge(licenseString) {
  if (licenseString == "ISC") {
    return "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
  } else if (licenseString == "MIT") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else {
    ("[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)");
  }
}

function generateMD(answers) {
  return `# ${answers.title}

  This project was created by ${answers.username}.
  <br>
  You can contact them at ${answers.userEmail}.
  <br>
  ![Profile Picture]( ${answers.avatarURL}&s=100)
  
  ## Description
  
  ${answers.description}
  
  ## Table of Contents
  
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Authors and Acknowledgment](#authors-and-acknowledgment)
  - [Tests](#tests)
  - [Questions](#Questions)
  - [License](#license)
  
  ## Installation
  
  ${answers.install}
  
  ## Usage
  
  ${answers.usage}
  
  ## License
  
  ${answers.license}
  <br>
  ${getLicenseBadge(answers.license)}
  
  ## Contributing
  
  ${answers.contributing}
  
  ## Tests
  
  ${answers.testing}
  
  ## Questions
  
  ${answers.questions}`;
}

async function init() {
  console.log(
    "Hi there. Please answer the following questions and we'll build your README for you."
  );

  try {
    const answers = await promptUser();
    const queryUrl = `https://api.github.com/users/${answers.username}`;

    axios.get(queryUrl).then(function (res) {
      const avatarURL = res.data.avatar_url;
      const userEmail = res.data.email;
      const markdown = generateMD({ ...answers, avatarURL, userEmail });
      writeFileAsync("README_mockup.md", markdown);
      console.log("Successfully wrote to README_mockup.md file");
    });
  } catch (err) {
    console.log(err);
  }
}

init();
