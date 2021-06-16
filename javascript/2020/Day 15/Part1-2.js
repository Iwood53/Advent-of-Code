const startingNumbers = [2,0,1,9,5,19]
const numSpokenPart1 = 2020;
const numSpokenPart2 = 30000000;


console.log('Answer for part 1: ', getNthNumberSpoken(numSpokenPart1, startingNumbers))
console.log('Answer for part 2: ', getNthNumberSpoken(numSpokenPart2, startingNumbers))


function getNthNumberSpoken(n, startingNumbers){
    var startingNumbersLength = startingNumbers.length;
    let nextNum = startingNumbers[0];
    var indexMap = new Map();
    for(let x = 0; x < n; x++){
        currentNum = nextNum;
        if (x < startingNumbersLength - 1){
            
            indexMap.set(currentNum, x);
            nextNum = startingNumbers[x + 1];
        }
        else{
            if (indexMap.has(currentNum)){ 
                nextNum = x - indexMap.get(currentNum)
                indexMap.set(currentNum, x)
            }
            else{
                indexMap.set(currentNum, x)
                nextNum = 0;
            }
        }   
    }
    return currentNum;
}