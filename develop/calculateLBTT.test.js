const { TestScheduler } = require("jest");

const calculateLBTT = require('./calculateLBTT');

test('Calculates the LBTT on a property worth £300,000 to equal £4600', () => {
    expect(calculateLBTT({
        propertyPrice: '300000'  //the propery price is always a string because inquirer returns an object with values as strings
    })).toStrictEqual({
        totalTax: 4600,
        transactionValue: '300000'
    })
})

test('Calculates the LBTT on a property worth £300,000 to equal £4600, handling the user entering £ and commas', () => {
    expect(calculateLBTT({
        propertyPrice: '£300,000'
    })).toStrictEqual({
        totalTax: 4600,
        transactionValue: '300000'
    })
})

test('Calculates the LBTT on a property worth £300,000.00 to equal £4600, handling the user entering pence', () => {
    expect(calculateLBTT({
        propertyPrice: '£300,000.00'
    })).toStrictEqual({
        totalTax: 4600,
        transactionValue: '300000.00'
    })
})

test('Calculates the LBTT on a property worth £300,000.50 to equal £4600, handling the user entering pence. LBTT is always rounded down to nearest £', () => {
    expect(calculateLBTT({
        propertyPrice: '£300,000.50'
    })).toStrictEqual({
        totalTax: 4600,
        transactionValue: '300000.50'
    })
})

test('Calculates the LBTT on a property worth £450,000 to equal £18,350', () => {
    expect(calculateLBTT({
        propertyPrice: '450000'
    })).toStrictEqual({
        totalTax: 18350,
        transactionValue: '450000'
    })
})

test('Calculates the LBTT on a property worth £100,000 to equal £0', () => {
    expect(calculateLBTT({
        propertyPrice: '100000'
    })).toStrictEqual({
        totalTax: 0,
        transactionValue: '100000'
    })
})

test('Calculates the LBTT on a property worth £1,000,000 to equal £78,350', () => {
    expect(calculateLBTT({
        propertyPrice: '1000000'
    })).toStrictEqual({
        totalTax: 78350,
        transactionValue: '1000000'
    })
})

test('Invalid user input', () => {
    expect(calculateLBTT({
        propertyPrice: 'hello'
    })).toStrictEqual('Please Enter a Number')
})