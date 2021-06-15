let uri = undefined
const fetch = require('node-fetch');

uri = process.env.DEEPSECRETS_ENDPOINT
if (uri[0] == null) {
    throw new Error("You have not added your function url as a secret!");
}

(async () => {
    const resp1 = await fetch(uri, {
        method: 'POST',
        body: "Body=testmessage2"      
    });
    var result1 = await resp1.text()

    const resp = await fetch(uri, {
        method: 'POST',
        body: "Body=testmessage3"      
    });
    var result = await resp.text()
    let test = JSON.stringify(result)

    if (test.length < 3) {
        console.log("No response... Try again!")
        process.exit(1)
    } else if ( result != `Thanks 😊! Stored your secret "testmessage3". 😯 Someone confessed that: "testmessage2"`) {
        console.log("Yay! 🎉 Thanks for returning a random message!")
    } else {
        console.log("Hey... Make sure it's random!.")
        console.log(`We got ${result}, which proves it was not random.`)
        process.exit(1)
    }
})().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
