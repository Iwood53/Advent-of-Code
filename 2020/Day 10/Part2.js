const fs = require('fs');

const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/).sort((a,b) => a - b);
input.unshift(0)

const lastAdaptor = +input[input.length - 1];

console.time('main function')
var test = countPaths(input, lastAdaptor)
console.timeEnd('main function')
console.log(test)

function getSuitableAdaptorsDown(nodePower, allAdaptors){
    let suitableAdaptors = allAdaptors.filter(adaptor => (nodePower > +adaptor && +adaptor + 3 >= nodePower))
    return suitableAdaptors
}

function countPaths(adaptors, node, pathCounter = 0){
    let suitableAdaptors = getSuitableAdaptorsDown(node, input);
    if (suitableAdaptors){
        suitableAdaptors.forEach(adaptor => {
            pathCounter += countPaths(adaptors, adaptor);
        });
    }
    if (suitableAdaptors.length == 0 && node < 4) { pathCounter++ }    
    return pathCounter
}