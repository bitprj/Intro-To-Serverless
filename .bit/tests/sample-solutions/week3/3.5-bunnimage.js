const fetch = require("node-fetch");
// npm i node-fetch@2

module.exports = async function (context, req, inputBlob) {

    let downloadUri = ""
    let success = false

    const fileName = context.bindingData.filename;

    // replace with your own blob storage URL and make sure to make the container public!
    const downloadPng = "https://bunnimagestorage.blob.core.windows.net/images/" + fileName + ".png";
    const downloadJpg = "https://bunnimagestorage.blob.core.windows.net/images/" + fileName + ".jpeg";

    const pngResp = await fetch(downloadPng, {
        method: 'GET',
    })

    const pngData = await pngResp;

    const jpgResp = await fetch(downloadJpg, {
        method: 'GET',
    })

    const jpgData = await jpgResp;

    if (pngData.status !== 200 && jpgData.status !== 200) {
        success = false;
    } else if (pngData.status === 200) {
        success = true;
        downloadUri = downloadPng
    } else if (jpgData.status === 200) {
        success = true;
        downloadUri = downloadJpg
    }

    context.log(`Success status of request for file ${fileName}: ${success}`);

    context.res = {
        body: {
            "downloadUri": downloadUri,
            "success": success,
        }
    };

}
