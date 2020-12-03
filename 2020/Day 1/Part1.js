const fs = require('fs');

var expenseArray = Object.values(fs.readFileSync('raw.csv', 'utf-8').split(/\r\n/));

var answer = 0;

expenseArray.some((element) => {
    var targetNum = 2020 - (+element);
    if (expenseArray.includes(targetNum.toString())){
        answer = (+element) * (+targetNum);
        return true;
    }
})

console.log(answer);