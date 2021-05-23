let uri = undefined
const fetch = require('node-fetch');

uri = process.env.MORSE_ENDPOINT
if (uri[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}

const answer = ".. .-.. --- ...- . -... .. - .--. .-. --- .--- . -.-. -"

try {
    (async () => {
        const resp = await fetch(uri + "&plaintext=ilovebitproject", {
            method: 'GET'
        });
        var data = await resp.text()
        let test = JSON.stringify(data)

        if (data.length < 3) {
            console.log("No response... Try again!")
            process.exit(1)
        } else if (data == answer) {
            console.log("Yay!🎉 Success - thanks for helping us on this top secret mission. Welcome to the team.")
            console.log(`We got ${answer} with the input of ilovebitproject`)
        } else {
            console.log(`YIKES! We got ${data}. That's not morse code. Try again!`)
        }

    })().catch( e => { console.error(e) })
} catch (e) {
    throw new Error("You have not added your function url as a secret!");
}
