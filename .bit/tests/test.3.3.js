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
        uri = process.env.BUNNIMAGE_ENDPOINT
        const blob_url = process.env.blob_url
        const containerName = process.env.container_name

        functions.checkSecret(uri, "BUNNIMAGE_ENDPOINT")

        fs.readFile(`${__dirname}/testimage.jpg`, async function (err, content) {
            try {
                let formData = new FormData()
                formData.append('data', content, { filename: "testimage.jpeg", type: "image/jpeg", data: content })

                const formHeaders = formData.getHeaders();

                const resp1 = await fetch(uri, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        ...formHeaders,
                        "codename": "bunnimagetestrun1000"
                    },
                });
                var result1 = await resp1.text()
                let test1 = JSON.stringify(result1)

                functions.validateResponseStatus(resp1, uri)

                var download = `${blob_url}/${containerName}/bunnimagetestrun1000.jpeg`;

                let resp = await fetch(download, {
                    method: 'GET',
                })
                let data = await resp;
                if (data.statusText == "The specified blob does not exist.") {
                    console.error("Hmm... We couldn't find our image with the correct name. Try again?")
                    await functions.throwError("Hmm... We couldn't find our image with the correct name. Try again?", user, repo)
                    process.exit(1)
                } else {
                    console.info("Yay! 🎉 We got our picture!")
                }

                const testresp = await fetch(uri, {
                    method: 'POST',
                    body: ""
                });
                var message = await testresp.text()

                if (message == "Sorry! No image attached.") {
                    console.error("Nice job catching those exceptions.")
                } else {
                    console.error("You missed something. What if someone didn't submit an image in the body?")
                    await functions.throwError("You missed something. What if someone didn't submit an image in the body?", user, repo)
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
