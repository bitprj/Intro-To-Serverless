let hello = undefined

try { hello = require('./../../week1/helloworld.js') }
catch(e) {
    console.error("Searching for \"helloworld.js\"... file cannot be found");
    process.exit(1)
}

let helloworld = hello()
let test_output = "Hello World"

if(helloworld != test_output){
    console.error(`Got: "${helloworld}", was expecting: "${test_output}".`)
    process.exit(1)
}

console.info("Yay! 🎉🎉🎉🎉🎉🎉🎉🍾")
