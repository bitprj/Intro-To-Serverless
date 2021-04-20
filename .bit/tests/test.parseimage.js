let uri = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

uri = process.env.FUNCTION_URL

if (uri[0] == null) {
    throw new Error("You have not added your function url as a secret!");
}

(async () => {
    fs.readFile(`${__dirname}/testimage.jpg`, async function(err, content) {
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
        var result = await resp.json()
        let test = JSON.stringify(result)

        if (test.length < 3) {
            console.log("No response... Try again!")
            process.exit(1)
        } else {
            console.log("Yay! 🎉 We got: " + test)
    }
  })
})();