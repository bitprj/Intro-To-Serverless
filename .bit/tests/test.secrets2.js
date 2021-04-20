let key = undefined
let endpoint = undefined

key = process.env.SUBSCRIPTION_KEY
endpoint = process.env.API_ENDPOINT

if (endpoint[0] == null || key[0] == null) {
    throw new Error("You have not added your secrets!");
}