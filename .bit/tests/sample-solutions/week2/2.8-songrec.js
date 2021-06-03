const querystring = require('querystring');
var fetch = require("node-fetch");

async function analyzeImage(img){
    const subscriptionKey = process.env['subscriptionkey'];
    const uriBase = process.env['endpoint'] + '/face/v1.0/detect';
	// env variables (similar to .gitignore/.env file) to not expose personal info

    // twilio phone-numbers:update "+15869913930" --sms-url="https://twlio-test.azurewebsites.net/api/HttpTrigger1?code=P0wvX4Wrv4iTCT8zw6r356rKLTDzNLC5g5OBfrvoIiJjdUr3jNzr3A=="

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': ['age']
    })

    // making the post request
    let resp = await fetch(uriBase + '?' + params.toString(),{
        /*The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise*/
        method: 'POST',
        body: img,
        // we want to send the image
        headers: {
            'Content-Type' : 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : process.env['subscriptionkey']
        }
    })

    // receive the response
    let data = await resp.json();

    return data;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);
    context.log(req.body)
    context.log(queryObject)
    url = queryObject.MediaUrl0;
    phone_number = queryObject.From;

    let resp = await fetch(url,{
        /*The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise*/
        method: 'GET',
    })

    // receive the response
    let data = await resp.arrayBuffer()
    let result = await analyzeImage(data)
    context.log(result)

    let age = result[0].faceAttributes.age
    context.log(age)
    if (age > 5 && age < 25) {
        id = "GenZ"
    } else if (age > 24 && age < 41) {
        id = "GenY"
    } else if (age > 40 && age < 57) {
        id = "GenX"
    } else if (age > 56 && age < 76) {
        id = "BabyBoomers"
    } else {
        id = "Unknown"
    }
    context.log(id)

    const songs = {"GenZ":"https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf", 
                   "GenY":"https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9", 
                   "GenX":"https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d", 
                   "BabyBoomers":"https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50", 
                   "Unknown":"https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"}
    let song = songs[id]

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: `We guessed you're part of this generation: ${id}! Happy listening! ${song}`
    };
}
