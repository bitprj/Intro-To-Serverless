
let uri;
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const functions = require('./functions');
const user = args['user'];
const repo = args['repo'];

async function main() {
    uri = process.env.HACKERVOICE_ENDPOINT;

    try {
        functions.checkSecret(uri, "HACKERVOICE_ENDPOINT")
        const commit_file = ['hackervoice/index.js']
        functions.checkCommit(commit_file)

        uri = functions.queryString(uri)

        test1 = "fifiiscool";
        uri1 = uri + "&password=" + test1;


        const resp = await fetch(uri1, {
            method: 'GET'
        });
        var data = await resp.text()

        functions.validateResponseStatus(resp, uri)

        if (data == test1) {
            console.log("Yay! 🎉 We got: " + JSON.stringify(data) + ", which matches our input.")
        } else {
            console.error("We got this " + JSON.stringify(data) + ". We should have gotten our input, 'fifiiscool' ... Try again!")
            await functions.throwError("We got this " + JSON.stringify(data) + ". We should have gotten our input, 'fifiiscool' ... Try again!", user, repo)
            process.exit(1)
        }
    }
    catch (e) {
        console.error(e);
        await functions.throwError(e, user, repo)
    }
}

main();
