const inputStart = 136760;
const inputEnd = 595730;

var answer = 0;
for(password = inputStart; password <= inputEnd; password++) { if(testPassword(password)) { answer++ } }
console.log(answer);

function testPassword(password, lastDigit = 0){
    if (String(password).length == 6){   
        if (/(\d)\1{1}/.test(String(password)) == false){ return false; }
    }
    if (String(password)[0] < lastDigit) { return false }

    lastDigit = String(password)[0];
    password = String(password).substring(1);
    
    if (password.length == 0){ return true; }
    return testPassword(password, lastDigit)   
}