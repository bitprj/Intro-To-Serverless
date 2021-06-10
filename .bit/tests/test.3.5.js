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
        let formData = new FormData()
        formData.append('data', content, {filename: "testimage.jpeg", type: "image/jpeg", data: content})
        
        const formHeaders = formData.getHeaders();
        
        const resp1 = await fetch(uri, {
            method: 'POST',
            body: formData,
             headers: {
                ...formHeaders,
                "codename" : "bunnimagetestrun1001"
              },        
        });
        var result1 = await resp1.json()
        let test1 = JSON.stringify(result)

        const testresp = await fetch(uri, {
            method: 'POST',
            body: ""       
        });
        var message = await testresp.json()

        if (message.downloadUri == `${blob_url}/${containerName}/bunnimagetestrun1001.jpg`) {
            console.log("Yay! 🎉 We got our picture!")
        } else {
            console.log("Hmmm... Maybe take another look at that download function.")
            process.exit(1)
        }
        
  })
})();