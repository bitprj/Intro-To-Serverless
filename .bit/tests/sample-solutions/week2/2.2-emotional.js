var fetch = require('node-fetch');
var multipart = require('parse-multipart')
  
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.'); 

    var boundary = multipart.getBoundary(req.headers['content-type']);
    // parse the body
    var parts = multipart.Parse(req.body, boundary);
    context.log(parts[0])
    var result = Buffer.from(parts[0].data).toString('base64')
    context.log(result)
    
    //analyze the image

    context.res = {
        body: result
    };
    context.done(); 
};
