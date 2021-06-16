const fs = require('fs');

var passwordsRaw = fs.readFileSync('raw.csv', 'utf-8').split(/\r\n/);

counter = 0;

passwordsRaw.forEach(element => {
    var dirtyRow = element.split(/\s|:|-/);
    var occurances = dirtyRow[4].split(dirtyRow[2]).length - 1;

    if (occurances >= dirtyRow[0] && occurances <= dirtyRow[1]){
        counter += 1;
    }
    
})

console.log(counter);
