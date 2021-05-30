let uri = undefined
const fetch = require('node-fetch');

const fs = require('fs') //get the methods in the fs package

let endpoint = undefined

uri = process.env.HACKERVOICE_ENDPOINT;

if (uri[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}

//if you wanna add more files, just put a comma after the filename (array)

const commit_file = ['HackerVoice/index.js']

for(var i = 0; i < commit_file.length; i++) {
    var a = commit_file[i];
    fs.access(commit_file[i], err => {
        if (err) {
            throw new Error("You did not commit '" + a + "'")
        }
    })
}


test1 = "fifiiscool";
uri1 = uri + "&password=" + test1;
if (uri[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}

try {
    (async () => {
        const resp = await fetch(uri1, {
            method: 'GET'
        });
        var data = await resp.text()
        let test = JSON.stringify(data)

        if (data == test1) {     
            console.log("Yay! 🎉 We got: " + JSON.stringify(data))
        } else {
            console.log("We got this " + JSON.stringify(data) + " ... Try again!")
            process.exit(1)
        }
    })();
} catch (e) {
    throw new Error("You have not added your function url as a secret!");
}
