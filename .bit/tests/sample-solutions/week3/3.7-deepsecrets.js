const qs = require('qs');
const CosmosClient = require("@azure/cosmos").CosmosClient;
// npm i qs @azure/cosmos

module.exports = async function (context, req) {

    const queryObject = qs.parse(req.body);
    const message = queryObject.Body;

    const document = { "message": message };

    const items = await createDocument(document);

    let responseMessage = "";

    if (items.length > 0) {

        context.log(`The fetched item is: ${JSON.stringify(items[0].message)}`);
        responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[0].message)}`;

    } else {

        context.log(`First item entered in DB`);
        responseMessage = `Thanks 😊! Stored your secret "${message}".`;

    }
    context.res = {
        body: responseMessage
    };

}

function getCosmosDBConfig() {
    const config = {
        endpoint: process.env.COSMOSDB_ENDPOINT,
        key: process.env.COSMOSDB_KEY,
        databaseId: "SecretStorer",
        containerId: "secrets",
        partitionKey: { kind: "Hash", paths: ["/secrets"] }
    };

    return config
}

async function createDbAndContainer(client, databaseId, containerId, partitionKey) {
    await client.databases.createIfNotExists({ id: databaseId });

    await client.database(databaseId)
        .containers.createIfNotExists(
            { id: containerId, key: partitionKey },
            { offerThroughput: 400 }
        );
}

async function createDocument(newItem) {

    const cosmosDBConfig = getCosmosDBConfig();
    const cosmosDbEndpoint = cosmosDBConfig.endpoint;
    const cosmosDbKey = cosmosDBConfig.key;

    const client = new CosmosClient({ endpoint: cosmosDbEndpoint, key: cosmosDbKey });
    const database = client.database(cosmosDBConfig.databaseId);
    const container = database.container(cosmosDBConfig.containerId);
    await createDbAndContainer(client, cosmosDBConfig.databaseId, cosmosDBConfig.containerId, cosmosDBConfig.partitionKey);

    const querySpec = {
        query: "SELECT top 1 * FROM c order by c._ts desc"
    };

    // read all items in the Items container before creating a new one
    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

    // Create the new entry and return the old one
    await container.items.create(newItem);
    return items
}