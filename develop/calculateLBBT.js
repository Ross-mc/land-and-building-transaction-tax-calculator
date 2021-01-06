const calculateLBTT = answers => {
    //inquirer returns an object of users answers as strings;
    //replace to remove commas, ie 200,000 becomes 200000 and £ signs
    const transactionValue = answers.propertyPrice.replace(/,/g, '').replace('£', '');

    //handle user enter non valid characters
    if (/[\D]/.test(transactionValue)) return 'Please Enter a Number'

    let parsedValue = parseFloat(transactionValue).toFixed(2);

    const Band = function(min, max, taxRate){
        this.min = min,
        this.max = max,
        this.taxRate = taxRate
    }

    const nilBand = new Band(0, 145000, 0);
    const lowBand = new Band(nilBand.max, 250000, 0.02);
    const midBand = new Band(lowBand.max, 325000, 0.05);
    const highBand = new Band(midBand.max, 750000, 0.1)
    // the highestBand has no limit so is handlded differently
    const veryHighTax = 0.12;

    const bands = [nilBand, lowBand, midBand, highBand];
    //remove bands that are less than the value of the property
    const validBands = bands.filter(band => band.min < parsedValue)

    let totalTax = 0;

    validBands.forEach(band => {
        //if the property is worth more than the band max, we tax the whole range of the band, else we tax the remaining balance
        parsedValue > band.max ? totalTax += (band.max - band.min) * band.taxRate : totalTax += (parsedValue - band.min) * band.taxRate;
    });

    //handle properties above bands

    if (parsedValue > highBand.max) totalTax += (parsedValue - highBand.max) * veryHighTax

    

    return `The total Land and Building Transaction Tax due on a property worth £${transactionValue} is £${totalTax}`
};




module.exports = calculateLBTT