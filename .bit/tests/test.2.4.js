let uri = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const functions = require('./functions.js')
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];


async function main() {
    try {
        uri = process.env.EMOTIONAL_ENDPOINT

        functions.checkSecret(uri, "EMOTIONAL_ENDPOINT")



        fs.readFile(`${__dirname}/testimage.jpg`, async function (err, content) {
            try {
                let formData = new FormData()
                formData.append('data', content, { filename: "testimage.jpeg", type: "image/jpeg", data: content })

                const formHeaders = formData.getHeaders();

                const resp = await fetch(uri, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        ...formHeaders,
                    },
                });
                var result = await resp.text()
                let test = JSON.stringify(result)

                functions.validateResponseStatus(resp, uri)

                if (test.length < 3) {
                    console.error("No response... Try again!")
                    await functions.throwError("No response... Try again!", user, repo)
                    process.exit(1)
                } else if (result == "happiness") {
                    console.info("Yay! 🎉 You're right, we're super happy (that was the main emotion in our test picture)")
                } else {
                    console.error("Try again! We didn't get the correct main emotion back.")
                    console.error(`We got "${result}" instead.`)
                    await functions.throwError(`Try again! We didn't get the correct main emotion back. We got '${result}' instead.`, user, repo)
                    process.exit(1)
                }
            } catch (e) {
                console.error("Try again! We got this error when trying to make a request: " + e)
                await functions.throwError("Try again! We got this error when trying to make a request: " + e, user, repo)
                process.exit(1)
            }
        })


    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}



main();
