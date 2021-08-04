let uri = undefined
const fetch = require('node-fetch');
const functions = require('./functions.js')
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];

async function main() {
    try {
        uri = process.env.DEEPSECRETS_ENDPOINT

        functions.checkSecret(uri, "DEEPSECRETS_ENDPOINT")

        const resp1 = await fetch(uri, {
            method: 'POST',
            body: "Body=testmessage2"
        });
        var result1 = await resp1.text()

        functions.validateResponseStatus(resp1, uri)

        const resp = await fetch(uri, {
            method: 'POST',
            body: "Body=testmessage3"
        });
        var result = await resp.text()
        let test = JSON.stringify(result)

        if (test.length < 3) {
            console.error("No response... Try again!")
            await functions.throwError("No response... Try again!", user, repo)
            process.exit(1)
        } else if (result == `Thanks 😊! Stored your secret "testmessage3". 😯 Someone confessed that: "testmessage2"`) {
            console.info("Yay! 🎉 Thanks for returning our message from your database!")
        } else {
            console.error("Try again! We didn't get our most recent secret back.")
            console.error(`We got "${result}", which is incorrect.`)
            await functions.throwError(`Try again! We didn't get our most recent secret back. We got '${result}', which is incorrect.`, user, repo)
            process.exit(1)
        }


    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}

main();
