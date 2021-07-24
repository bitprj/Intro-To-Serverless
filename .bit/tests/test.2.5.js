
let uri = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const functions = require('./functions.js')

uri = process.env.EMOTIONAL_ENDPOINT

functions.checkSecret(uri, "EMOTIONAL_ENDPOINT")

(async () => {
    fs.readFile(`${__dirname}/testimage.jpg`, async function(err, content) {
        try {
            let formData = new FormData()
            formData.append('data', content, {filename: "testimage.jpeg", type: "image/jpeg", data: content})
            
            const formHeaders = formData.getHeaders();
            
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
                process.exit(1)
            } else if (result.includes("https://giphy.com/gifs/")) {
                console.info("Yay! 🎉 Thanks for the gif! " + result)
            } else {
                console.error("Try again! We didn't get a link to a gif back. We got " + result + " instead.")
                process.exit(1)
            }
        } catch (e) {
            console.error("Try again! We got this error when trying to make a request: " + e)
            process.exit(1)
        }
  })
})().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
