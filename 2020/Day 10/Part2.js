const fs = require('fs');


const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/).sort((a,b) => a - b);
input.unshift(0)

const lastAdaptor = +input[input.length - 1];

var answer = countPaths(input, lastAdaptor)
console.log(answer)

function getSuitableAdaptorsDown(nodePower, allAdaptors){
    let suitableAdaptors = allAdaptors.filter(adaptor => (nodePower > +adaptor && +adaptor + 3 >= nodePower))
    return suitableAdaptors
}

function countPaths(adaptors, node, myMap = new Map()){
    let pathCounter = 0
    let suitableAdaptors = getSuitableAdaptorsDown(node, input);
    if (suitableAdaptors){
        suitableAdaptors.forEach(adaptor => {
            if (myMap.has(adaptor)){
                pathCounter += myMap.get(adaptor)
            }
            else{
                var nextCount = countPaths(adaptors, adaptor, myMap);
                myMap.set(adaptor, nextCount)
                pathCounter += nextCount;
            }
        });
    }
    if (suitableAdaptors.length == 0 && node < 4) { pathCounter++ }    
    return pathCounter
}