const fetch = require("node-fetch");
const { BlobServiceClient } = require("@azure/storage-blob");
const parseMultipart = require("parse-multipart");

// npm i parse-multipart node-fetch@2 @azure/storage-blob

module.exports = async function (context, req) {

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    /*
    Get the filename via the route defined in function.json 
    (see https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=in-process%2Cfunctionsv2&pivots=programming-language-javascript#customize-the-http-endpoint)
    
    The entry looks like this:
    "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "route": "bunnimage-upload/{filename:alpha}",
      "name": "req",
      "methods": [
        "post"
      ]
    },
    */
    const fileName = context.bindingData.filename;
    const boundary = parseMultipart.getBoundary(req.headers['content-type']);
    const parsedBody = parseMultipart.Parse(req.body, boundary);

    context.log(`The parsed file is: ${parsedBody[0].filename}`);

    const fileType = parsedBody[0].type;

    const ext = getExtByFileType(fileType);

    let responseMessage = "";
    let responseStatus = 200;

    if (ext) {

        responseMessage = await uploadFile(context, connectionString, parsedBody, ext, fileName);

    }
    else {
        // The file type was invalid, we return the corresponding error
        responseStatus = 400;
        responseMessage = `Invalid file type ${fileType}`;

    }

    context.log(responseMessage)

    context.res = {
        status: responseStatus,
        body: responseMessage
    };


}

async function uploadFile(context, connectionString, parsedBody, ext, fileName) {

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    // Create a unique name for the container
    const containerName = "bunnimage-upload";

    const blobName = fileName + "." + ext;
    
    context.log(`Uploading to Azure storage container ${containerName} as blob: ${blobName}`);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    context.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);

    return `File ${parsedBody[0].filename} saved successfully as ${blobName}`;
}

function getExtByFileType(fileType) {

    let ext = "";

    if (fileType === "image/png") {
        ext = "png";
    } else if (fileType === "image/jpeg") {
        ext = "jpeg";
    }

    return ext;

}