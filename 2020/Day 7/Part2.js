const fs = require('fs');


// input for browser = $('pre').innerText.split('\n').filter(row => row.length)
const input = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = getTotalBagCount('shiny gold', parseBags(input));
console.log(answer);


function getTotalBagCount(targetBag, fullBagList){
    var counter = 0;
    var bags = fullBagList.find(x => x.target_bag == targetBag);
    
    bags.subBags.forEach(bag => {
        var nextBagDeep = getTotalBagCount(bag.bag, fullBagList);
        counter += +bag.count * (1 + nextBagDeep);
    })
        
    return counter;    
}

function parseBags(bags, parsedBagList = []){
    var targetBag = bags[0].split(" bags contain ")[0];
    var subBags = bags[0].split(" bags contain ")[1].split(/[,.]/);
    var subBagsJson = []
    
    subBags.forEach(subBag => {
        var cleanBag = subBag.trim().replace('.', '');
        cleanBag = cleanBag.substring(0, cleanBag.lastIndexOf(' '))
        if (cleanBag[0]){
            if (cleanBag[0] != 'n'){
                subBagsJson.push({ bag : cleanBag.substring(2), count : cleanBag[0]})
            }
        }       
    });

    parsedBagList.push({target_bag : targetBag, subBags : subBagsJson});
    
    bags.shift();
    if (bags.length == 0){ return parsedBagList }
    
    return parseBags(bags, parsedBagList);
} 