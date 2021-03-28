  let key = undefined
let endpoint = undefined

key = process.env.SUBSCRIPTION_KEY
endpoint = process.env.API_ENDPOINT

if (endpoint == null || key == null) {
    throw new Error("You have not added your secrets!");
}