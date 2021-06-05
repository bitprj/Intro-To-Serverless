const querystring = require('querystring');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);
    message = queryObject.Body;

    const responseMessage = message

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

// https://www.twilio.com/docs/sms/quickstart/node
// https://www.neilwithdata.com/azure-functions-post-body-js