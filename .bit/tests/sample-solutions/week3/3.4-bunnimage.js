const { BlobServiceClient } = require("@azure/storage-blob");
const connectionstring = process.env["AZURE_STORAGE_CONNECTION_STRING"];

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "images";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);

    for await (const blob of deletecontainerClient.listBlobsFlat()) {
        context.log('\t', blob.name);
        var outputPrint = await deleteBlob(blob.name)
        context.log(outputPrint)
        // access the blob's name and call deleteBlob to delete it!
    }
    context.log("Just deleted your blobs!")
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};

async function deleteBlob(filename) {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "images";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);
    deletecontainerClient.deleteBlob(filename)

    result = {
        body: {
            deletename: filename,
            success: true
        }
    };
    return result;
}
