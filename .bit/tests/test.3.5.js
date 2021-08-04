let uri1 = undefined
let uri2 = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const functions = require('./functions.js')

const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];

async function main() {
    try {
        uri1 = process.env.BUNNIMAGE_ENDPOINT
        uri2 = process.env.BUNNIMAGE_ENDPOINT2
        const blob_url = process.env.blob_url
        const containerName = process.env.container_name
        functions.checkSecret(uri2, "BUNNIMAGE_ENDPOINT2")
        fs.readFile(`${__dirname}/testimage.jpg`, async function (err, content) {
            try {
                let formData = new FormData()
                formData.append('data', content, { filename: "testimage.jpeg", type: "image/jpeg", data: content })

                const formHeaders = formData.getHeaders();

                const resp1 = await fetch(uri1, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        ...formHeaders,
                        "codename": "bunnimagetestrun1001"
                    },
                });
                var result1 = await resp1.text()
                let test1 = JSON.stringify(result1)

                const testresp = await fetch(uri2, {
                    method: 'GET',
                    headers: {
                        "username": "bunnimagetestrun1001"
                    }
                });
                var message = await testresp.json()

                functions.validateResponseStatus(testresp, uri)

                if (JSON.stringify(message.downloadUri).includes(`${blob_url}/${containerName}/bunnimagetestrun1001.jpeg`)) {
                    console.info("Yay! 🎉 We got our picture!")
                } else {
                    console.error("Hmmm... Maybe take another look at that download function.")
                    console.error("Check to make sure you don't have extra characters in your secrets, and test your function yourself as well.")
                    await functions.throwError("Hmmm... Maybe take another look at that download function. Also, check to make sure you don't have extra characters in your secrets, and test your function yourself as well.", user, repo)
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
