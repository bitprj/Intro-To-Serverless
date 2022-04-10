const fetch = require('node-fetch');
const querystring = require('qs');
// npm i node-fetch@2 qs

module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);
    context.log(queryObject);
    
    const url = queryObject.MediaUrl0;

    const resp = await fetch(url, {
        /* The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise */
        method: 'GET',
    });

    const data = await resp.arrayBuffer();
    const result = await analyzeImage(data);
    
    context.log(result);

    const age = result[0].faceAttributes.age;
    context.log(age);
    
    let id = "nothing";

    if (age > 5 && age < 25) {
        id = "GenZ";
    } else if (age > 24 && age < 41) {
        id = "GenY";
    } else if (age > 40 && age < 57) {
        id = "GenX";
    } else if (age > 56 && age < 76) {
        id = "BabyBoomers";
    } else {
        id = "nothing";
    }

    context.log(id);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: id
    };
};


async function analyzeImage(img) {
    
    const subscriptionKey = process.env['subscriptionkey'];
    const uriBase = process.env['endpoint'] + '/face/v1.0/detect';
    // env variables (similar to .gitignore/.env file) to not expose personal info
    // twilio phone-numbers:update "+15869913930" --sms-url="https://twlio-test.azurewebsites.net/api/HttpTrigger1?code=P0wvX4Wrv4iTCT8zw6r356rKLTDzNLC5g5OBfrvoIiJjdUr3jNzr3A=="

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': ['age']
    });

    let resp = await fetch(uriBase + '?' + params.toString(), {
        /* The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise */
        method: 'POST',
        body: img,
        // we want to send the image
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    });

    const data = await resp.json();

    return data;
};
