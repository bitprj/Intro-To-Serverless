const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const functions = require('./functions');
const user = args['user'];
const repo = args['repo'];

let uri = process.env.TWOCATZ_ENDPOINT

async function main() {
    try {
        functions.checkSecret(uri, "TWOCATZ_ENDPOINT")

        //if you wanna add more files, just put a comma after the filename (array)
        const commit_file = ['twocatz/index.js']

        functions.checkCommit(commit_file)

        const resp = await fetch(uri, {
            method: 'GET'
        });
        var data = await resp.json()
        let test = JSON.stringify(data)

        functions.validateResponseStatus(resp, uri)

        if (test.length < 3) {
            console.error("No response... Try again!")
            process.exit(1)
        }
        try {
            var catimage = test;
            var newCat = Buffer.from(catimage, 'base64').toString('ascii')
            console.info("Yay! 🎉 We got your cat picture 🐱")
        } catch (e) {
            console.error("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!")
            await functions.throwError("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!", user, repo)
            process.exit(1)
        }

    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}

main();
