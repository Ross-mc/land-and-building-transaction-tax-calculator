// Purchase price	LBTT rate
// Up to £145,000	0%
// £145,001 to £250,000	2%
// £250,001 to £325,000	5%
// £325,001 to £750,000	10%
// Over £750,000	12%




const calculateLBTT = answers => {
    //inquirer returns an object of users answers as strings;
    //replace to remove commas, ie 200,000 becomes 200000 and £ signs
    let transactionValue = answers.propertyPrice.replace(',', '').replace('£', '');

    //handle user enter non valid characters
    if (/[\d]/.test(transactionValue)) return 'Please Enter a Number'

    transactionValue = parseFloat(transactionValue).toFixed(2);

    return `The Land and Building Transaction Tax is £${transactionValue * 0.1}`
};




module.exports = calculateLBTT