let hello = undefined

try { hello = require('../../README.md') }
catch(e) {
    throw new Error("Searching for \"README.md\"... file cannot be found");
}

console.log("Yay! 🎉🎉🎉🎉🎉🎉🎉🍾")
