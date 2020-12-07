const fs = require('fs');

var bags = fs.readFileSync('raw.txt', 'utf-8').split(/\r\n/);

var answer = getPossibleBagCount('shiny gold', parseBags(bags)).length;

console.log(answer)

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

function getPossibleBagCount(targetBag, fullBagList, matchingBagList = [])
{    
    fullBagList.forEach(record =>{      
        if (record.subBags.some(e => e.bag === targetBag)){
            if (!matchingBagList.includes(record.target_bag)){ matchingBagList.push(record.target_bag) }
            return getPossibleBagCount(record.target_bag, fullBagList, matchingBagList);  
        }            
    })
    return matchingBagList;
}

