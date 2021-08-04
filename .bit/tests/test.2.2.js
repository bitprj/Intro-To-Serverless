let uri = undefined
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];
const fs = require('fs');
const FormData = require('form-data');
const functions = require('./functions.js')


async function main() {
    try {
        uri = process.env.EMOTIONAL_ENDPOINT

        functions.checkSecret(uri, "EMOTIONAL_ENDPOINT")

        // if you wanna add more files, just put a comma after the filename(array)
        const commit_file = ['emotionalgifs/index.js']


        functions.checkCommit(commit_file)

        fs.readFile(`${__dirname}/testimage.jpg`, async function (err, content) {
            try {
                let formData = new FormData()
                formData.append('data', content, { filename: "testimage.jpeg", type: "image/jpeg", data: content })

                const formHeaders = formData.getHeaders();
                var baseImage = Buffer.from(content).toString('base64')
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
                    await functions.throwError(e, user, repo)
                    process.exit(1)
                } else if (result != baseImage) {
                    console.error("Sorry, we didn't get our image back in base64. Try again!")
                    await functions.throwError("Sorry, we didn't get our image back in base64. Try again!", user, repo)
                    process.exit(1)
                } else {
                    console.info("Yay! 🎉 We got the same image back in base64!")
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
