const fs = require('fs');

var expenseArray = Object.values(fs.readFileSync('raw.csv', 'utf-8').split(/\r\n/).map(Number));

console.time('main')

expenseArray.sort((a, b) => {return a-b});

var completeFlag = false;

expenseArray.some(element1 => {
  expenseArray.some(element2 => {
    var targetNum = 2020 - element1 - element2;
    if (expenseArray.includes(targetNum)){
      answer = element1 * element2 * targetNum;
      completeFlag = true;
      return true;     
    }
  })
  return completeFlag;
})

console.timeEnd('main');
console.log(answer);