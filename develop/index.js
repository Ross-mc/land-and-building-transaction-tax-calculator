const inquirer = require('inquirer');
const calculateLBTT = require('./calculateLBTT')

const userQuestions = {
    'name': 'propertyPrice',
    'type': 'input',
    'message': 'What is the purchase price of your property?'
};

const init = () => {
    inquirer
    .prompt(userQuestions)
    .then(answers => {
        const returnedValue = calculateLBTT(answers);
        if (typeof returnedValue === 'string'){
            console.log(returnedValue)
        } else {
            console.log(`The total Land and Buildings Transaction Tax due on a property worth £${returnedValue.transactionValue} is £${returnedValue.totalTax}`)
        }
    })
};

init();