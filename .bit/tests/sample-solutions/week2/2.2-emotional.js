const multipart = require('parse-multipart');
//npm i parse-multipart
  
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.'); 

    const boundary = multipart.getBoundary(req.headers['content-type']);
    
    const parts = multipart.Parse(req.body, boundary);
    
    context.log(parts[0]);
    
    const result = Buffer.from(parts[0].data).toString('base64');
    
    context.log(result);
    
    //TODO analyze the image

    context.res = {
        body: result
    };

};
