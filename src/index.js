function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    //Delete spaces
    expr = expr.split(' ').join('');

    let result = calculationInBrackets(expr);
    if (result.includes('(') || result.includes(')')) throw Error('ExpressionError: Brackets must be paired');
    result = calcStr(result.replace('+--', '+').replace('---', '-'));
    console.log('RES: ' + result);
    return +result;
}

function calculationInBrackets(expression) {
    const regExp = /\([\d\*\/\+\-\.]+\)/;
    while(regExp.exec(expression)) {
        const foundStr = regExp.exec(expression)[0];
        console.log('FoundStr :' + foundStr);
        expression = expression.replace(foundStr, calcStr(foundStr.slice(1, foundStr.length - 1)));
        console.log('Expression: ' + expression);
    }
    return expression;
}

function calcStr(str) {
    let result;
    const firstOperation = /[0-9.]+[*/]\-?[0-9.]+/;
    const secondOperation = /\-?[0-9.]+[+-]\-?[0-9.]+/;
    while(firstOperation.exec(str)) {
        const foundOper = firstOperation.exec(str)[0];
        const resultOper = calcOneOperation(foundOper);
        str = str.replace(foundOper, resultOper);
        if(str.match(/\(\-?[0-9.]+\)/)) {
            const rep = str.match(/\(\-?[0-9.]+\)/)[0];
            str = str.replace(rep, rep.slice(1, -1));
        }
    }
    while(secondOperation.exec(str)) {
        const foundOper = secondOperation.exec(str)[0];
        const resultOper = calcOneOperation(foundOper);
        str = str.replace(foundOper, resultOper);
        if(str.match(/\(\-?[0-9.]+\)/)) {
            const rep = str.match(/\(\-?[0-9.]+\)/)[0];
            str = str.replace(rep, rep.slice(1, -1));
        }
    }
    if(firstOperation.exec(str) || secondOperation.exec(str)) {
        result = calcStr(str);
    }
    else result = str;
    return str;
}

function calcOneOperation(str) {
    console.log('Oper: ' + str);
    let numbers;
    let mathOper;
    let isMinusToMinus;
    if(str.includes('*')) mathOper = '*';
    else if(str.includes('/')) mathOper = '/';
    else if(str.includes('+')) mathOper = '+';
    else if(str.includes('--')) {
        str = str.replace('--', '+');
        mathOper = '+';
    }
    else if(str.includes('-')) {
        isMinusToMinus = (str.indexOf('-') === 0);
        mathOper = '-';
    }
    
    numbers = str.split(mathOper);
    console.log(numbers);
    let result;
    switch(mathOper) {
        case '*': 
            result = +numbers[0] * +numbers[1];
            break;
        case '/': 
            if(numbers[1] === '0') throw TypeError('TypeError: Division by zero.');
            result = +numbers[0] / +numbers[1]; 
            break;
        case '+': 
            result = +numbers[0] + +numbers[1];
            break;
        case '-': 
            if(isMinusToMinus) result = (+numbers[1] + +numbers[2]) * -1;
            else result =  +numbers[0] - +numbers[1];
            break;
    }
    console.log('RESFORONE: ' + result);
    return result.toFixed(15).toString();
}

module.exports = {
    expressionCalculator
}