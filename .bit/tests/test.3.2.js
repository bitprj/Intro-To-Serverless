let uri = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const functions = require('./functions.js')

uri = process.env.BUNNIMAGE_ENDPOINT
const blob_url = process.env.blob_url
const containerName = process.env.container_name

const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];



async function main() {
    try {

        functions.checkSecret(blob_url, "blob_url")
        functions.checkSecret(containerName, "containerName")


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
                    },
                });
                var result1 = await resp1.text()
                let test1 = JSON.stringify(result1)

                functions.validateResponseStatus(resp1, uri)

                var download = `${blob_url}/${containerName}/test.jpeg`;

                let resp = await fetch(download, {
                    method: 'GET',
                })
                let data = await resp;
                if (data.statusText == "The specified blob does not exist.") {
                    console.error("Hmm... We couldn't find our image. Try again?")
                    console.error(`We tried using "${download}" to find the image, but did not receive a response.`)
                    await functions.throwError(`Hmm... We couldn't find our image. Try again? We tried using '${download}' to find the image, but did not receive a response.`, user, repo)
                    process.exit(1)
                } else {
                    console.info("Yay! 🎉 We got our picture!")
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
