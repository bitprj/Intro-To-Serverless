var multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body;
    var parsedBody = multipart.Parse(body, boundary);
    context.log(parsedBody);
    
    var filetype = parsedBody[0].type;
    if (filetype == "image/png") {
        ext = "png";
    } else if (filetype == "image/jpeg") {
        ext = "jpeg";
    } else {
        username = "invalidimage"
        ext = "";
    }

    var responseMessage = await uploadFile(parsedBody, ext);
    context.res = {
        body: responseMessage
    };
    console.log(responseMessage)
}

async function uploadFile(parsedBody, ext){
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    // Create a unique name for the container
    const containerName = //your container name;
    
    console.log('\nCreating container...');
    console.log('\t', containerName);
    
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Create the container
    const blobName = 'test' + "." + ext;

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    console.log('\nUploading to Azure storage as blob:\n\t', blobName);
    
    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
    return "File Saved";    
}
