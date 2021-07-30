let uri;
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const functions = require('./functions');
const user = args['user'];
const repo = args['repo'];

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
            await functions.throwError("We got this " + JSON.stringify(data) + ". We should have gotten our input, 'fifiiscool' ... Try again!", user, repo)
            console.error("We got this " + JSON.stringify(data) + ". We should have gotten our input, 'fifiiscool' ... Try again!")
            process.exit(1)
        }
    })().catch( e => { 
        console.error("Try again! We got this error when trying to make a request: " + e); 
        await functions.throwError("Try again! We got this error when trying to make a request: " + e, user, repo)
        process.exit(1) 
    })
} catch (e) {
    await functions.throwError("You have not added your function url as a secret!", user, repo)
    console.error("You have not added your function url as a secret!");
    process.exit(1)
}
