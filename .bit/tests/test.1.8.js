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
            functions.validateResponseStatus(resp, uri)
        } catch (e) {
            console.error("We're having trouble making a request to your endpoint. Try again?")
            process.exit(1)
        }

        if (data.length < 3) {
            console.error("No response... Try again!")
            process.exit(1)
        } else if (data == answer) {
            console.info("Yay!🎉 Success - thanks for helping us on this top secret mission. Welcome to the team.")
            console.info(`We got "${answer}" with the input of ilovebitproject`)
        } else {
            console.error(`YIKES! We got "${data}" instead of "${answer}". Try again!`)
            process.exit(1)
        }

        try {
            const resp2 = await fetch(uri, {
                method: 'GET'
            });
            var data2 = await resp2.text()
            let test2 = JSON.stringify(data2)
            functions.validateResponseStatus(resp2, uri)
        } catch (e) {
            console.error("We're having trouble making a request to your endpoint when plaintext is blank. Try again?")
            process.exit(1)
        }

        if (data2.length < 3) {
            console.error("No response... Try again!")
            process.exit(1)
        } else if (data2 == "Please enter some text to convert!") {
            console.info("Also, great work catching a blank plaintext parameter value.")
        } else {
            console.error(`Sorry! You forgot to check for a blank plaintext. If we sending nothing in "plaintext," we should get "Please enter some text to convert!" Instead, we got "${data2}"`)
            process.exit(1)
        }
    })().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
} catch (e) {
    console.error("You have not added your function url as a secret!");
    process.exit(1)
}
