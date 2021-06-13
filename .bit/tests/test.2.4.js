let uri = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

uri = process.env.EMOTIONAL_ENDPOINT

if (uri[0] == null) {
    throw new Error("You have not added your function url as a secret!");
}

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
    
            if (test.length < 3) {
                console.log("No response... Try again!")
                process.exit(1)
            } else if ( result == "happiness") {
                console.log("Yay! 🎉 You're right, we're super happy (that was the main emotion in our test picture)")
            } else {
                console.log("Try again! We didn't get the correct main emotion back.")
                process.exit(1)
            }
        } catch (e) {
            console.log("Try again! We got this error when trying to make a request: " + e)
            process.exit(1)
        }
  })
})().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
