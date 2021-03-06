const Band = function(min, max, taxRate){
  this.min = min;
  this.max = max;
  this.taxRate = taxRate;
}

const nilBand = new Band(0, 145000, 0);
const lowBand = new Band(nilBand.max, 250000, 0.02);
const midBand = new Band(lowBand.max, 325000, 0.05);
const highBand = new Band(midBand.max, 750000, 0.1)
// the highestBand has no limit so is handlded differently
const veryHighTax = 0.12;

const veryHighTaxBand = new Band(highBand.max, Infinity, 0.12);

const bands = [nilBand, lowBand, midBand, highBand, veryHighTaxBand];



const calculateLBTT = answers => {
    //inquirer returns an object of users answers as strings;
    //replace to remove commas, ie 200,000 becomes 200000 and £ signs
    const transactionValue = answers.propertyPrice.replace(/,/g, '').replace('£', '');

    //handle user enter non valid characters - we allow a single decimal point - note this does not mutate transactionValue
    if (/[\D]/.test(transactionValue.replace('.', ''))) return 'Please Enter a Valid Number'

    const parsedValue = parseFloat(Number(transactionValue).toFixed(2));


    //remove bands that are less than the value of the property
    const applicableBands = bands.filter(band => band.min < parsedValue)

    let totalTax = applicableBands.reduce(
        (acc, { max, min, taxRate }) =>
          parsedValue > max
            ? acc + (max - min) * taxRate
            : acc + (parsedValue - min) * taxRate,
        0
      ); //if the property is worth more than the band max, we tax the whole range of the band, else we tax the remaining , accumulating the value 

    //handle properties above bands

    // if (parsedValue > highBand.max) totalTax += (parsedValue - highBand.max) * veryHighTax;

    totalTax = Math.floor(totalTax) //The tax amount is always rounded down to the nearest pound

    return {
        totalTax,
        transactionValue
    }
};




module.exports = calculateLBTT