let uri = undefined
const fetch = require('node-fetch');
const functions = require('./functions.js')
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];

async function main() {
    try {
        uri = process.env.DEEPSECRETS_ENDPOINT

        functions.checkSecret(uri, "DEEPSECRETS_ENDPOINT")

        const resp = await fetch(uri, {
            method: 'POST',
            body: "ToCountry=US&MediaContentType0=image%2Fjpeg&ToState=MI&SmsMessageSid=MM0fe83458b74a1f626eb0da4685ab28b5&NumMedia=1&ToCity=UTICA&FromZip=28394&SmsSid=MM0fe83458b74a1f626eb0da4685ab28b5&FromState=NC&SmsStatus=received&FromCity=VASS&Body=Hi&FromCountry=US&To=%2B15869913930&ToZip=48316&NumSegments=1&MessageSid=MM0fe83458b74a1f626eb0da4685ab28b5&AccountSid=ACee62fed677d382600b621e6f24de9bb0&From=%2B19105563874&MediaUrl0=https%3A%2F%2Fapi.twilio.com%2F2010-04-01%2FAccounts%2FACee62fed677d382600b621e6f24de9bb0%2FMessages%2FMM0fe83458b74a1f626eb0da4685ab28b5%2FMedia%2FME29644fd97901859108bc35e210b588f6&ApiVersion=2010-04-01"
        });
        var result = await resp.text()
        let test = JSON.stringify(result)

        functions.validateResponseStatus(resp, uri)

        if (test.length < 3) {
            console.error("No response... Try again!")
            await functions.throwError("No response... Try again!", user, repo)
            process.exit(1)
        } else if (result == "Hi") {
            console.info("Yay! 🎉 Thanks for returning our message!")
        } else {
            console.error("Try again! We didn't get our message back.")
            console.error(`We got "${result}" instead of "Hi", which is what we sent you.`)
            await functions.throwError(`Try again! We didn't get our message back. We got '${result}' instead of 'Hi', which is what we sent you.`, user, repo)
            process.exit(1)
        }

    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}

main();
