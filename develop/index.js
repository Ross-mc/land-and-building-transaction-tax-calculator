const inquirer = require('inquirer');
const calculateLBTT = require('./calculateLBBT')

const userQuestions = {
    'name': 'propertyPrice',
    'type': 'input',
    'message': 'What is the purchase price of your property?'
};

const init = () => {
    inquirer
    .prompt(userQuestions)
    .then(answers => console.log(calculateLBTT(answers)))
};

init();