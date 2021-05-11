let endpoint = undefined

endpoint = process.env.FUNCTION_URL

if (endpoint[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}

const fs = require('fs') //get the methods in the fs package

//if you wanna add more files, just put a comma after the filename (array)
const commit_file = ['package.json']

for(var i = 0; i < commit_file.length; i++) {
    var a = commit_file[i];
    fs.access(commit_file[i], err => {
        if (err) {
          throw new Error("You did not commit '" + a + "'")
        }
    })
}
