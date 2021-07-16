const connectionString = process.env.storage_account_connection_string;
const containerName = process.env.container_name;
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs")
const functions = require('./functions.js')

functions.checkSecret(connectionString, "connectionString")
functions.checkSecret(containerName, "containerName")

(async () => {
    fs.readFile(`${__dirname}/testimage.jpg`, async function(err, content) {
        try {
            const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
            // Create a unique name for the container            
            console.error('\nCreating container...');
            console.error('\t', containerName);
            
            // Get a reference to a container
            const containerClient = blobServiceClient.getContainerClient(containerName);
            
            // Create the container
            const blobName = 'bitcamptest.jpg';
        
            // Get a block blob client
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            
            console.error('\nUploading to Azure storage as blob:\n\t', blobName);
            
            // Upload data to the blob
            const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
        } catch (e) {
            console.error("Sorry! You haven't created your blob storage account yet. Check your secrets!")
            console.error(`Here's the error: ${e}`)
            process.exit(1)
        }
    })
})().catch( e => { console.error("Try again! We got this error when trying to make a request: " + e); process.exit(1) })
