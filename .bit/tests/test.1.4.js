let uri = undefined
const fetch = require('node-fetch');
const functions = require('./functions.js')

uri = process.env.HACKERVOICE_ENDPOINT;

functions.checkSecret(uri, "HACKERVOICE_ENDPOINT")

//if you wanna add more files, just put a comma after the filename (array)

const commit_file = ['hackervoice/index.js']
functions.checkCommit(commit_file)

uri = functions.queryString(uri)

test1 = "fifiiscool";
uri1 = uri + "&password=" + test1;

try {
    (async () => {
        const resp = await fetch(uri1, {
            method: 'GET'
        });
        var data = await resp.text()
        let test = JSON.stringify(data)

        functions.validateResponseStatus(resp, uri)

        if (data == test1) {     
            console.info("Yay! 🎉 We got: " + JSON.stringify(data) + ", which matches our input.")
        } else {
            console.error("We got this " + JSON.stringify(data) + ". We should have gotten our input, 'fifiiscool' ... Try again!")
            process.exit(1)
        }
    })().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
} catch (e) {
    console.error("You have not added your function url as a secret!");
    process.exit(1)
}
