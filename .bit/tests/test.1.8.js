let uri = undefined
const fetch = require('node-fetch');
const functions = require('./functions.js')

uri = process.env.MORSE_ENDPOINT
functions.checkSecret(uri, "MORSE_ENDPOINT")


const answer = ".. .-.. --- ...- . -... .. - .--. .-. --- .--- . -.-. -"

uri = functions.queryString(uri)

try {
    (async () => {
        try {
            const resp = await fetch(uri + "&plaintext=ilovebitproject", {
                method: 'GET'
            });
            var data = await resp.text()
            let test = JSON.stringify(data)
            functions.getStatus(resp, uri)
        } catch (e) {
            console.log("We're having trouble making a request to your endpoint. Try again?")
            process.exit(1)
        }

        if (data.length < 3) {
            console.log("No response... Try again!")
            process.exit(1)
        } else if (data == answer) {
            console.log("Yay!🎉 Success - thanks for helping us on this top secret mission. Welcome to the team.")
            console.log(`We got ${answer} with the input of ilovebitproject`)
        } else {
            console.log(`YIKES! We got ${data} instead of ${answer}. Try again!`)
            process.exit(1)
        }
    })().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
} catch (e) {
    throw new Error("You have not added your function url as a secret!");
}
