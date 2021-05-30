const querystring = require('querystring');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Parse image link (MediaUrl0) from parameters
    const queryObject = querystring.parse(req.body);
    context.log(queryObject)
    url = queryObject.MediaUrl0;
    // the request body you are parsing looks like this: ToCountry=US&MediaContentType0=image%2Fjpeg&ToState=MI&SmsMessageSid=MM0fe83458b74a1f626eb0da4685ab28b5&NumMedia=1&ToCity=UTICA&FromZip=28394&SmsSid=MM0fe83458b74a1f626eb0da4685ab28b5&FromState=NC&SmsStatus=received&FromCity=VASS&Body=&FromCountry=US&To=%2B15869913930&ToZip=48316&NumSegments=1&MessageSid=MM0fe83458b74a1f626eb0da4685ab28b5&AccountSid=ACee62fed677d382600b621e6f24de9bb0&From=%2B19105563874&MediaUrl0=https%3A%2F%2Fapi.twilio.com%2F2010-04-01%2FAccounts%2FACee62fed677d382600b621e6f24de9bb0%2FMessages%2FMM0fe83458b74a1f626eb0da4685ab28b5%2FMedia%2FME29644fd97901859108bc35e210b588f6&ApiVersion=2010-04-01

    context.log(url)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: url
    };
}