const querystring = require('querystring');
var fetch = require("node-fetch");

const accountSid = "***";
const authToken = "***";
const client = require('twilio')(accountSid, authToken);
// https://www.twilio.com/docs/voice/quickstart/node

const VoiceResponse = require('twilio').twiml.VoiceResponse;
// https://www.twilio.com/docs/voice/twiml/play

async function analyzeImage(img){
    const subscriptionKey = process.env['subscriptionkey'];
    const uriBase = process.env['endpoint'] + '/face/v1.0/detect';
	// env variables (similar to .gitignore/.env file) to not expose personal info

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
    if (age > 5 && age < 25) {
        id = "GenZ"
    } else if (age > 24 && age < 41) {
        id = "GenY"
    } else if (age > 40 && age < 57) {
        id = "GenX"
    } else if (age > 56 && age < 76) {
        id = "BabyBoomers"
    } else {
        id = "nothing"
    }

    const songs = {"GenZ":"https://github.com/bitprj/Intro-To-Serverless/blob/main/.bit/music/SALES%20-%20Chinese%20new%20year.mp3", "GenY":"https://github.com/bitprj/Intro-To-Serverless/blob/main/.bit/music/Spice%20Girls%20-%20Wannabe.mp3", "GenX":"https://github.com/bitprj/Intro-To-Serverless/blob/main/.bit/music/Golden%20Earring%20-%20Radar%20Love%20(1973)%20HD%200815007.mp3", "BabyBoomers":"https://github.com/bitprj/Intro-To-Serverless/blob/main/.bit/music/Elvis%20Presley%20-%20Jailhouse%20Rock%20(Music%20Video).mp3", "nothing":"https://api.twilio.com/cowbell.mp3"}
    let song = songs[id]
    context.log(song)
    const response = new VoiceResponse();
    response.play({
        loop: 3
    }, song);

    client.calls
      .create({
         twiml: response,
         to: phone_number,
         from: '+15869913930' // your own twilio number
       })
      .then(call => console.log(call.sid));

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: `We guessed you're this age: ${id}! We'll be calling you soon, hang tight.`
    };
}