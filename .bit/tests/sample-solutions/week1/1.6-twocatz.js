const fetch = require('node-fetch');
// npm install node-fetch@2

module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');

    const cat = await getCatPic(context);

    context.res = {
        body: {
            cat
        }
    };
}

async function getCatPic(context) {

    const resp = await fetch("https://cataas.com/cat/cute/says/Bitcamp", {
        method: 'GET'
    });

    const data = await resp.arrayBuffer();

    context.log(data);

    const dataInBase64 = Buffer.from(data).toString('base64');

    return dataInBase64;
}