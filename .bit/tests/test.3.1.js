const connectionString = process.env.storage_account_connection_string;
const containerName = process.env.container_name;
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs")
const functions = require('./functions.js')
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];


async function main() {
    try {

        functions.checkSecret(connectionString, "connectionString")
        functions.checkSecret(containerName, "containerName")

        fs.readFile(`${__dirname}/testimage.jpg`, async function (err, content) {
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
                await functions.throwError(`Error with creating blob storage account, check your secrets! Here is the error: ${e}`, user, repo)
                process.exit(1)
            }
        })

    }
    catch (e) {
        await functions.throwError(e, user, repo)
    }
}

main();
