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
        var result = await resp.text()
        let test = JSON.stringify(result)

        functions.validateResponseStatus(resp, uri)

        if (test.length < 3) {
            console.error("No response... Try again!")
            await functions.throwError("No response... Try again!", user, repo)
            process.exit(1)
        } else if (result == "We guessed you're part of this generation: GenY! Happy listening! https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9") {
            console.info("Yay! 🎉 You're right, you guessed the generation correctly AND returned the right song!")
        } else {
            console.error(`Try again! We received "${result}" instead of the correct response, "We guessed you're part of this generation: GenY! Happy listening! https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9".`)
            await functions.throwError(`Try again! We received '${result}' instead of the correct response, 'We guessed you're part of this generation: GenY! Happy listening! https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9'.`, user, repo)
            process.exit(1)
        }

    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}





main();
