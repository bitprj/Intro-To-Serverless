let uri = undefined
const fetch = require('node-fetch');

uri = process.env.HTTP_ENDPOINT
if (uri[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}

try {
    (async () => {
        const resp = await fetch(uri, {
            method: 'GET'
        });
        var data = await resp.text()
        let test = JSON.stringify(data)

        if (test.length < 3) {
            console.log("No response... Try again!")
            process.exit(1)
        } else {
            console.log("Yay! 🎉 We got: " + JSON.stringify(data))
        }
    })();
} catch (e) {
    throw new Error("You have not added your function url as a secret!");
}