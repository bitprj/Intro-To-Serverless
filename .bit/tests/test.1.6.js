const fetch = require('node-fetch');
uri = process.env.TWOCATZ_ENDPOINT
if (uri[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}

const fs = require('fs') //get the methods in the fs package
//if you wanna add more files, just put a comma after the filename (array)
const commit_file = ['twocatz/index.js']

for(var i = 0; i < commit_file.length; i++) {
    var a = commit_file[i];
    fs.access(commit_file[i], err => {
        if (err) {
          throw new Error("You did not commit '" + a + "'")
        }
    })
}

try {
  (async () => {
      const resp = await fetch(uri, {
          method: 'GET'
      });
      var data = await resp.json()
      let test = JSON.stringify(data)

      if (test.length < 3) {
          console.log("No response... Try again!")
          process.exit(1)
      }

      try {
          var catimage = test;
          var newCat = Buffer.from(catimage, 'base64').toString('ascii')
          console.log("Yay! 🎉 We got your cat picture 🐱")
      } catch (e) {
          throw new Error("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!")
      }

  })().catch( e => { console.error("Try again! Did you install your npm packages? We got this error when trying to make a request: " + e); process.exit(1) })
} catch (e) {
  throw new Error("You have not added your function url as a secret!");
}
