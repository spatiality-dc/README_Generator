const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// async function queryGitHub(username) {
//   const queryUrl = `https://api.github.com/users/${username}`;
//   this.response;
//   const gitHubResponse = await axios.get(queryUrl);
//   return gitHubResponse;
// }

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email address.",
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

function generateMD(answers) {
  return `# ${answers.title}

  This project was created by ${answers.username}. You can contact them at ${answers.email}.
  <br>
  ![Profile Picture]( ${answers.profileImageURL} "Profile Pic")
  
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
  
  ## Contributing
  
  ${answers.contributing}
  
  ## Tests
  
  ${answers.testing}
  
  ## Questions
  
  ${answers.questions}`;
}

async function init() {
  // let gitHubData = await queryGitHub(answers.username);
  // answers.profileImageURL = gitHubData.data.avatar_url;

  console.log(
    "Hi there. Please answer the following questions and we'll build your README for you."
  );

  try {
    const answers = await promptUser();

    const html = generateMD(answers);

    await writeFileAsync("README_mockup.md", html);

    console.log("Successfully wrote to README_mockup.md file");
  } catch (err) {
    console.log(err);
  }
}

init();

// Questions for Petra:

// My await command with gitHubData is throwing an error. Says I have not define "answers"
// This means I cant pull the user avatar

// Can I make if statements on my prompt questions?

// For example, if a user chooses a license from the checkbox, that check box delivers not only Text, but a license "badge" that is added into the markdown?

// https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
