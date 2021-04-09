let context = undefined

try { context = require('../../databaseContext.js') }
catch(e) {
    throw new Error("Searching for \"databaseContext.js\"... file cannot be found");
}

console.log("You have created your database context successfully! 🎉🎉🎉🎉🎉🎉🎉🍾")