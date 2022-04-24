const fetch = require('node-fetch')
// npm i node-fetch@2

module.exports = async function (context, req) {

    const name1 = req.query.name1;
    const name2 = req.query.name2;
    const name3 = req.query.name3;
    const name4 = req.query.name4;

    const firstCat = await getCatPic(name1, context);
    const secondCat = await getCatPic(name2, context);
    const thirdCat = await getCatPic(name3, context);
    const fourthCat = await getCatPic(name4, context);

    context.res = {
        body: {
            cat1: firstCat,
            cat2: secondCat,
            cat3: thirdCat,
            cat4: fourthCat
        }
    };
}

async function getCatPic(name, context) {

    const resp = await fetch("https://bit-cat.azurewebsites.net/cat/says/" + name, {
        method: 'GET'
    });

    const data = await resp.arrayBuffer()
    context.log(data)
    const convertedData = Buffer.from(data).toString('base64')
    return convertedData
}
