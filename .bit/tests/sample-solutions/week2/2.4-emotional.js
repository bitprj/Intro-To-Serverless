const fetch = require('node-fetch');
const multipart = require('parse-multipart')
//npm i node-fetch@2 parse-multipart

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    
    const parts = multipart.Parse(req.body, boundary);

    const result = await analyzeImage(parts[0].data);

    let emotions = result[0].faceAttributes.emotion;
    let objects = Object.values(emotions);
    
    const mainEmotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    context.res = {
        body: mainEmotion
    };
    
    console.log(result);
    
};

async function analyzeImage(byteArray) {

    const subscriptionKey = process.env['subscriptionKey'];
    const uriBase = process.env['endpoint'] + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    });

    const resp = await fetch(uriBase + `?${params.toString()}`, {
        method: 'POST',
        body: byteArray,
        headers: {
            'Content-Type': "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    });

    const data = await resp.json();

    return data;
}
