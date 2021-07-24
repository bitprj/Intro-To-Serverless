const fetch = require('node-fetch')
// npm install node-fetch

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let name1 = req.query.name1
    let name2 = req.query.name2
    let name3 = req.query.name3
    let name4 = req.query.name4


    async function getCatPic(name) {
        let resp = await fetch("https://cataas.com/cat/cute/says/" + name, {
            method: 'GET'
        });
        
        let data = await resp.arrayBuffer()
        context.log(data)
        data = Buffer.from(data).toString('base64')
        return data
    }

    let firstcat = await getCatPic(name1)
    let secondcat = await getCatPic(name2)
    let thirdcat = await getCatPic(name3)
    let fourthcat = await getCatPic(name4)

 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: firstcat,
            cat2: secondcat,
            cat3: thirdcat,
            cat4: fourthcat
        }
    };
}