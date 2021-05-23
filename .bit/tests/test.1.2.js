let hello = undefined

try { hello = require('./../../week1/helloworld.js') }
catch(e) {
    throw new Error("Searching for \"helloworld.js\"... file cannot be found");
}

let helloworld = hello()
let test_output = "Hello World"

if(helloworld != test_output){
    throw new Error(`Got: "${helloworld}", was expecting: "${test_output}".`)
}

console.log("Yay! 🎉🎉🎉🎉🎉🎉🎉🍾")
