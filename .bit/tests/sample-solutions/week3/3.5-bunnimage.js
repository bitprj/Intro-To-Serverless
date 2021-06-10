var fetch = require("node-fetch");
module.exports = async function (context, req, inputBlob) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var username = req.headers['username'];
    var download = ""
    var downloadpng = "https://bunnimagestorage.blob.core.windows.net/images/" + username + ".png";
    var downloadjpg = "https://bunnimagestorage.blob.core.windows.net/images/" + username + ".jpeg";
// replace with your own blob storage URL and make sure to make the container public!
    
    let pngresp = await fetch(downloadpng, {
        method: 'GET',
    })
    let pngdata = await pngresp;
    
    let jpgresp = await fetch(downloadjpg, {
        method: 'GET',
    })
    let jpgdata = await jpgresp;
    
    if (pngdata.statusText == "The specified blob does not exist." && jpgdata.statusText == "The specified blob does not exist." ) {
        success = false;
    } else if (pngdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadpng
    } else if (jpgdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpg
    }

    context.res = {
            body: {
                    "downloadUri" : download,
                    "success": success,
            }
    };


    // receive the response

    context.log(download);
    context.done();
}
