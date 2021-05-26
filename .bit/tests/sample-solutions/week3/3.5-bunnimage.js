var fetch = require("node-fetch");
module.exports = async function (context, req, inputBlob) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var username = req.headers['username'];
    var download = "https://bunnimagestorage.blob.core.windows.net/images/" + username + ".png";
// replace with your own blob storage URL and make sure to make the container public!
    
    let resp = await fetch(download, {
        method: 'GET',
    })
    let data = await resp;
    if (data.statusText == "The specified blob does not exist.") {
        success = false;
        context.log("Does not exist: " + data)
    } else {
        success = true;
        context.log("Does exist: " + data)
    }

    context.res = {
            body: {
                    "downloadUri" : download,
                    "success": success,
            }
    };


    // receive the response

    context.log(download);
    context.log(data)
    context.done();
}
