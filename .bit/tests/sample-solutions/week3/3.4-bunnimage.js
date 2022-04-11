const { BlobServiceClient } = require("@azure/storage-blob");

/* 
Timer-triggered Azure Function need a storage account
When developing locally do not forget to set the "AzureWebJobsStorage": "UseDevelopmentStorage=true"
in the local.settings.json file
*/

//Cron values (see function.json - schedule)
//0 */5 * * * *
//https://crontab.guru/every-5-minutes

module.exports = async function (context, myTimer) {

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const deleteContainerName = "images";

    const blobContainerClient = await BlobServiceClient.fromConnectionString(connectionString).getContainerClient(deleteContainerName);
    for await (const blob of blobContainerClient.listBlobsFlat()) {
        context.log(`Deleting blob name ${blob.name}`);
        // log in console what file you are deleting
        await blobContainerClient.deleteBlob(blob.name);
    }
    context.log(`All blobs of container ${deleteContainerName} deleted`);

};
