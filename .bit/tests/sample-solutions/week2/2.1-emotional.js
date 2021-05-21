var fetch = require('node-fetch');
  
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.'); 

    let image = req.body
    
    //analyze the image
    var result = await analyzeImage(image);

    context.res = {
        body: {
            result
        }
    };
    console.log(result)
    context.done(); 
};
 
async function analyzeImage(byteArray){
    
    const subscriptionKey = '<YOUR SUBSCRIPTION KEY>';
    const uriBase = '<YOUR ENDPOINT>' + '/face/v1.0/detect';

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
