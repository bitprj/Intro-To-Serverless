const fetch = require('node-fetch');
const functions = require('./functions.js')
uri = process.env.TWOCATZ_ENDPOINT

functions.checkSecret(uri, "TWOCATZ_ENDPOINT")

//if you wanna add more files, just put a comma after the filename (array)
const commit_file = ['twocatz/index.js']

functions.checkCommit(commit_file)

try {
  (async () => {
      const resp = await fetch(uri, {
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
          var catimage = test;
          var newCat = Buffer.from(catimage, 'base64').toString('ascii')
          console.info("Yay! 🎉 We got your cat picture 🐱")
      } catch (e) {
          console.error("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!")
          process.exit(1)
      }

  })().catch( e => { console.error("Try again! Did you install your npm packages? We got this error when trying to make a request: " + e); process.exit(1) })
} catch (e) {
    console.error("You have not added your function url as a secret!");
    process.exit(1)
}
