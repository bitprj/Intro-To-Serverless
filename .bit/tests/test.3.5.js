let uri1 = undefined
let uri2 = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

uri1 = process.env.BUNNIMAGE_ENDPOINT
uri2 = process.env.BUNNIMAGE_ENDPOINT2
const blob_url = process.env.blob_url
const containerName = process.env.container_name

if (uri1[0] == null || uri2[1] == null) {
    throw new Error("You have not added your function url as a secret!");
}

(async () => {
    fs.readFile(`${__dirname}/testimage.jpg`, async function(err, content) {
        try {
            let formData = new FormData()
            formData.append('data', content, {filename: "testimage.jpeg", type: "image/jpeg", data: content})
            
            const formHeaders = formData.getHeaders();
            
            const resp1 = await fetch(uri1, {
                method: 'POST',
                body: formData,
                 headers: {
                    ...formHeaders,
                    "codename" : "bunnimagetestrun1001"
                  },        
            });
            var result1 = await resp1.text()
            let test1 = JSON.stringify(result1)
    
            const testresp = await fetch(uri2, {
                method: 'GET',
                headers: {
                    "username" : "bunnimagetestrun1001"
                }      
            });
            var message = await testresp.json()
    
            if (JSON.stringify(message.downloadUri).includes(`${blob_url}/${containerName}/bunnimagetestrun1001.jpeg`)) {
                console.log("Yay! 🎉 We got our picture!")
            } else {
                console.log("Hmmm... Maybe take another look at that download function.")
                console.log(message.downloadUri)
                console.log(`${blob_url}/${containerName}/bunnimagetestrun1001.jpeg`)
                process.exit(1)
            }
        } catch (e) {
            console.log("Try again! We got this error when trying to make a request: " + e)
            process.exit(1)
        }
  })
})().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
