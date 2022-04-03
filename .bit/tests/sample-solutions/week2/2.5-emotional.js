const fetch = require('node-fetch');
const multipart = require('parse-multipart')
// npm i fetch-node@2 parse-multipart

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);

    const parts = multipart.Parse(req.body, boundary);

    const result = await analyzeImage(parts[0].data);

    let emotions = result[0].faceAttributes.emotion;
    let objects = Object.values(emotions);

    const mainEmotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects))

    const apiResult = await fetch("https://api.giphy.com/v1/gifs/translate?s=" + mainEmotion + "&api_key=your_key&limit=1");
    const jsonResult = await apiResult.json();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: jsonResult.data.url
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
