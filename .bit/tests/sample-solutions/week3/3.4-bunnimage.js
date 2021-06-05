const { BlobServiceClient } = require("@azure/storage-blob");
const connectionstring = process.env["AZURE_STORAGE_CONNECTION_STRING"];
const account = "bunnimagestorage";

// https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs
// 0 */5 * * * *
// https://crontab.guru/every-5-minutes

module.exports = async function (context, myTimer) {
    // create blobserviceclient object that is used to create container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "images";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);    
    for await (const blob of deletecontainerClient.listBlobsFlat()) {
        context.log('\t', blob.name);
        await deleteBlob(blob.name)
    }
    context.log("Just deleted your blobs!")

};

async function deleteBlob(filename){
    // create blobserviceclient object that is used to create container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "images";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);
    const deleteblockBlobClient = deletecontainerClient.getBlockBlobClient(filename);
    const downloadBlockBlobResponse = await deleteblockBlobClient.download(0);
    const blobDeleteResponse = deleteblockBlobClient.delete();
    console.log(`Deleted block blob ${filename} successfully`);
    result = {
        body : {
            deletename: filename,
            success: true
        }
    };
    return result;
    // this is optional, just shows how you can check on progress - always log everything!

}
