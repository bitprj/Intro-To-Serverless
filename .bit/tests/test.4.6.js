let uri = undefined
const fetch = require('node-fetch');
const functions = require('./functions.js')

const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];


async function main() {
    try {

        uri = process.env.TWOCATZ_ENDPOINT

        functions.checkSecret(uri, "TWOCATZ_ENDPOINT")

        uri = functions.queryString(uri)
        const resp = await fetch(uri + "&name1=hi&name2=hi&name3=hi&name4=hi", {
            method: 'GET'
        });
        var data = await resp.json()
        let test = JSON.stringify(data)

        functions.validateResponseStatus(resp, uri)

        if (test.length < 3) {
            console.error("No response... Try again!")
            await functions.throwError("No response... Try again!", user, repo)
            process.exit(1)
        }

        try {
            var catimage1 = data.cat1;
            var catimage2 = data.cat2;
            var catimage3 = data.cat3;
            var catimage4 = data.cat4;
            console.info("Yay! 🎉 We got your cat pictures 🐱")
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
