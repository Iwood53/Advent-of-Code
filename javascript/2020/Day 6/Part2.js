const fs = require('fs');

var input = fs.readFileSync('raw.txt', 'utf-8').split('\r\n\r\n');

answer = 0;

input.forEach(group => {
    people = group.split("\r\n");
    people.sort((a, b) => { return a.length - b.length })

    var runningString = ""
    for (char in people[0]){
        if ((/[a-zA-Z]/).test(people[0][char])){           
            fullyAnsweredFlag = true;
            for (answers in people){
                if (answers > 0 && !people[answers].includes(people[0][char])){ fullyAnsweredFlag = false }
            }
            if (fullyAnsweredFlag) { runningString += people[0][char] }
        }
    }   
    answer += runningString.length;
})

console.log(answer);
