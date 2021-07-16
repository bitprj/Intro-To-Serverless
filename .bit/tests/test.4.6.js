let uri = undefined
const fetch = require('node-fetch');
const functions = require('./functions.js')

uri = process.env.TWOCATZ_ENDPOINT
uri = functions.queryString(uri)

try {
    (async () => {
        const resp = await fetch(uri + "&name1=hi&name2=hi&name3=hi&name4=hi", {
            method: 'GET'
        });
        var data = await resp.json()
        let test = JSON.stringify(data)

        functions.validateResponseStatus(resp, uri)

        if (test.length < 3) {
            console.error("No response... Try again!")
            process.exit(1)
        }

        try {
            var catimage1 = data.cat1;
            var catimage2 = data.cat2;
            var catimage3 = data.cat3;
            var catimage4 = data.cat4;
            console.info("Yay! 🎉 We got your cat pictures 🐱")
        } catch (e) {
            console.error("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!")
            process.exit(1)
        }
    })().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
} catch (e) {
    console.error("You have not added your function url as a secret!");
    process.exit(1)
}
