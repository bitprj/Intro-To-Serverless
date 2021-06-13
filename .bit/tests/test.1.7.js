let uri = undefined
const fetch = require('node-fetch');

uri = process.env.TWOCATZ_ENDPOINT

try {
    (async () => {
        try {
            const resp = await fetch(uri, {
                method: 'GET'
            });
            var data = await resp.json()
            let test = JSON.stringify(data)
    
            if (test.length < 3) {
                console.log("No response... Try again!")
                process.exit(1)
            }
        } catch (e) {
            console.log("Did you return valid JSON? Try again!")
            process.exit(1)
        }
        try {
            var catimage1 = data.cat1;
            var catimage2 = data.cat2;
            var newCat1 = Buffer.from(catimage1, 'base64').toString('ascii')
            var newCat2 = Buffer.from(catimage2, 'base64').toString('ascii')
            console.log("Yay! 🎉 We got your cat pictures 🐱")
        } catch (e) {
            throw new Error("Sorry! We couldn't find one or both of the cat pictures. Make sure you encoded in BASE64!")
        }

        var array = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
        var names = data.names
        var name1 = names[0]
        var name2 = names[1]

        try {
            if (array.includes(name1) && array.includes(name2)) {
                console.log(`Yay! 🎉 Thanks for getting our names right. We got: ${name1} and ${name2}`)
            } else {
                throw new Error(`Sorry, your names, ${name1} and ${name2}, were not correct.`)
            }
        } catch(e) {
            throw new Error(`Sorry, your names, ${name1} and ${name2}, were not correct.`)  
        }

    })().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
} catch (e) {
    throw new Error("You have not added your function url as a secret!");
}
