
let uri;
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const functions = require('./functions');
const user = args['user'];
const repo = args['repo'];

async function main() {
    try {
        uri = process.env.HACKERVOICE_ENDPOINT

        functions.checkSecret(uri, "HACKERVOICE_ENDPOINT")

        //If we have no query string then add one
        //this allows us to append without error
        uri = functions.queryString(uri)

        const uriWithQuery = uri + "&password=letmein"

        const resp = await fetch(uriWithQuery, {
            method: 'GET'
        });

        functions.validateResponseStatus(resp, uri)

        var correct = await resp.text()

        const response = await fetch(uri + "&password=incorrect", {
            method: 'GET'
        });

        var incorrect = await response.text()

        try {
            if (correct == "Access granted." && incorrect == "Access denied.") {
                console.info("Yay! 🎉 You didn't let the bad guys in.")
            } else {
                console.error("Try again!")
                console.error(`We submitted "letmein" and got "${correct}", which should equal "Access granted."`)
                console.error(`We submitted "incorrect" and got "${incorrect}", which should equal "Access denied."`)
                await functions.throwError("We got the wrong response, you let the bad guys in!", user, repo)
                process.exit(1)
            }
        } catch (e) {
            console.error("Are you sure you returned something to us? We didn't get anything. Try again!")
            await functions.throwError("Are you sure you returned something to us? We didn't get anything. Try again!", user, repo)
            process.exit(1)
        }


    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}

main();
