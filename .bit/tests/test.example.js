const fs = require('fs') //get the methods in the fs package

//if you wanna add more files, just put a comma after the filename (array)
const commit_file = ['../../httptime.js', 'file_name.js']

for(var i = 0; i < commit_file.length; i++) {
    var a = commit_file[i];
    fs.access(commit_file[i], err => {
        if (err) {
          return console.error("You did not commit '" + a + "'")
        }
    })
}