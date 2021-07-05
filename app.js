const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('try entering something \n', userinput => {
    console.log(userinput);
});