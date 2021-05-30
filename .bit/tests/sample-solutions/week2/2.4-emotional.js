var fetch = require('node-fetch');
var multipart = require('parse-multipart')
  
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.'); 

    var boundary = multipart.getBoundary(req.headers['content-type']);
    // parse the body
    var parts = multipart.Parse(req.body, boundary);
    
    //analyze the image
    var result = await analyzeImage(parts[0].data);

    let emotions = result[0].faceAttributes.emotion
    let objects = Object.values(emotions)
    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects))

    context.res = {
        body: main_emotion
    };
    console.log(result)
    context.done(); 
};
 
async function analyzeImage(byteArray){
    
    const subscriptionKey = process.env['subscriptionKey'];
    const uriBase = process.env['endpoint'] + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    let resp= await fetch(uriBase + `?${params.toString()}`, {
        method: 'POST',
        body: byteArray,
        headers: {
            'Content-Type': "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    })

    let data = await resp.json();
    
    return data; 
}
