let uri = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

uri = process.env.EMOTIONAL_ENDPOINT

if (uri[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}


// if you wanna add more files, just put a comma after the filename (array)
const commit_file = ['emotionalgifs/index.js']

for(var i = 0; i < commit_file.length; i++) {
    var a = commit_file[i];
    fs.access(commit_file[i], err => {
        if (err) {
          throw new Error("You did not commit '" + a + "'")
        }
    })
}

(async () => {
    fs.readFile(`${__dirname}/testimage.jpg`, async function(err, content) {
        try {
            let formData = new FormData()
            formData.append('data', content, {filename: "testimage.jpeg", type: "image/jpeg", data: content})
            
            const formHeaders = formData.getHeaders();
            var baseImage = Buffer.from(content).toString('base64')
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
            } else if (result != baseImage){
                console.log("Sorry, we didn't get our image back in base64. Try again!")
                process.exit(1)
            } else {
                console.log("Yay! 🎉 We got the same image back in base64!")
        }
    } catch (e) {
        console.log("Try again! We got this error when trying to make a request: " + e)
        process.exit(1)  
    }
  })
})().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
