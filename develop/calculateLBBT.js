const calculateLBBT = answers => {
    //inquirer returns an object of users answers as strings;
    let transactionValue = answers.propertyPrice;
    //replace to remove commas, ie 200,000 becomes 200000
    let purchasePrice = transactionValue.replace(',', '');

    purchasePrice = parseFloat(purchasePrice)

    //handle user inputting a random string
    if (purchasePrice === NaN){
        return 'Please enter a number'
    }

    return `The Land and Building Transaction Tax is £${purchasePrice * 0.1}`
};




module.exports = calculateLBBT