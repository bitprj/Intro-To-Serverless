let uri = undefined
const fetch = require('node-fetch');
const functions = require('./functions.js')
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];



async function main() {
    try {

        uri = process.env.SONGREC_ENDPOINT

        functions.checkSecret(uri, "SONGREC_ENDPOINT")


        const resp = await fetch(uri, {
            method: 'POST',
            body: "ToCountry=US&MediaContentType0=image%2Fjpeg&ToState=MI&SmsMessageSid=MM0fe83458b74a1f626eb0da4685ab28b5&NumMedia=1&ToCity=UTICA&FromZip=28394&SmsSid=MM0fe83458b74a1f626eb0da4685ab28b5&FromState=NC&SmsStatus=received&FromCity=VASS&Body=&FromCountry=US&To=%2B15869913930&ToZip=48316&NumSegments=1&MessageSid=MM0fe83458b74a1f626eb0da4685ab28b5&AccountSid=ACee62fed677d382600b621e6f24de9bb0&From=%2B19105563874&MediaUrl0=https%3A%2F%2Fapi.twilio.com%2F2010-04-01%2FAccounts%2FACee62fed677d382600b621e6f24de9bb0%2FMessages%2FMM0fe83458b74a1f626eb0da4685ab28b5%2FMedia%2FME29644fd97901859108bc35e210b588f6&ApiVersion=2010-04-01"
        });

        functions.validateResponseStatus(resp, uri)

        var result = await resp.text()
        let test = JSON.stringify(result)

        if (test.length < 3) {
            console.error("No response... Try again!")
            await functions.throwError("No response... Try again!", user, repo)
            process.exit(1)
        } else if (result == "GenY") {
            console.info("Yay! 🎉 You're right, you guessed the generation correctly!")
        } else {
            console.error("Try again! We didn't get the correct generation/age back.")
            console.error(`We got "${result}" but expected "GenY"`)
            await functions.throwError(`Try again! We didn't get the correct generation/age back. We got '${result}' but expected 'GenY'`, user, repo)
            process.exit(1)
        }
    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}





main();
