const qs = require('qs');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
//npm i qs twilio

module.exports = async function (context, req) {
   
    const queryObject = qs.parse(req.body);
    const message = queryObject.Body;

    const twiml = new MessagingResponse();
    twiml.message('You said: ' + message);
  
    context.res = {
      status: 200,
      body: twiml.toString(),
      headers: { 'Content-Type': 'application/xml' },
      isRaw: true
    };

}

// https://www.twilio.com/docs/sms/quickstart/node
// https://www.twilio.com/docs/usage/tutorials/serverless-webhooks-azure-functions-and-node-js
