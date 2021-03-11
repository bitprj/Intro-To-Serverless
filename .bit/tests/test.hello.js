let hello = undefined

try { hello = require('../../helloworld.js') }
catch(e) {
    throw new Error("FIZZBUZ AINT FIZZIN' - DANIEL");
}

let helloworld = hello()
let test_output = "Hello World!"

if(helloworld != test_output){
    throw new Error(`You're not fizzing well - Zan - Got: ${helloworld}, was expecting: ${test_output}.`)
}

console.log("Yay! 🎉🎉🎉🎉🎉🎉🎉🍾")
