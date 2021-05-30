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

    let cat = await getCatPic()
 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat
        }
    };
}
