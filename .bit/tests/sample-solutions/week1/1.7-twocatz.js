const fetch = require('node-fetch');
// npm install node-fetch@2

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const firstCat = await getCatPic(context);
    const secondCat = await getCatPic(context);

    const namesArray = [];
    namesArray.push(getNames());
    namesArray.push(getNames());

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: firstCat,
            cat2: secondCat,
            names: namesArray
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

function getNames() {
    const listOfNames = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];
    const randomValue = Math.floor(listOfNames.length * Math.random());
    const resultName = listOfNames[randomValue];
    return resultName;
}
