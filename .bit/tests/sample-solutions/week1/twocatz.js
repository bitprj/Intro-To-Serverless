const fetch = require('node-fetch')
// npm install node-fetch

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    async function getCatPic() {
        let resp = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {
            method: 'GET'
        });
        
        let data = await resp.arrayBuffer()
        context.log(data)
        data = Buffer.from(data).toString('base64')
        return data
    }

    function getNames() {
        var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
        var random_value = Math.floor(names.length * Math.random())
        var resultname = names[random_value]
        return resultname
    }

    let firstcat = await getCatPic()
    let secondcat = await getCatPic()
    let name1 = getNames()
    let name2 = getNames()
 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: firstcat,
            cat2: secondcat,
            names: [name1, name2]
        }
    };
}
