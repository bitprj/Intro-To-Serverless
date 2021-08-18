let uri;
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const functions = require('./functions');
const user = args['user'];
const repo = args['repo'];

async function main() {
    try {

        uri = process.env.TWOCATZ_ENDPOINT
        functions.checkSecret(uri, "TWOCATZ_ENDPOINT")

        try {
            const resp = await fetch(uri, {
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
        } catch (e) {
            console.error("Did you return valid JSON? Try again!")
            await functions.throwError("Did you return valid JSON? Try again!", user, repo)
            process.exit(1)
        }


        try {
            var catimage1 = data.cat1;
            var catimage2 = data.cat2;
            var newCat1 = Buffer.from(catimage1, 'base64').toString('ascii')
            var newCat2 = Buffer.from(catimage2, 'base64').toString('ascii')
            console.info("Yay! 🎉 We got your cat pictures 🐱")
        } catch (e) {
            console.error("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!")
            await functions.throwError("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!", user, repo)
            process.exit(1)
        }

        var array = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
        var names = data.names
        var name1 = names[0]
        var name2 = names[1]

        try {
            if (array.includes(name1) && array.includes(name2)) {
                console.info(`Yay! 🎉 Thanks for getting our names right. We got: "${name1}" and "${name2}"`)
            } else {
                console.error(`Sorry, your names, "${name1}" and "${name2}", were not correct.`)
                await functions.throwError(`Sorry, your names, '${name1}' and '${name2}', were not correct.`, user, repo)
                process.exit(1)
            }
        } catch (e) {
            console.error(`Sorry, your names, '${name1}' and '${name2}', were not correct.`)
            await functions.throwError(e, user, repo)
            process.exit(1)
        }
    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}

main();
