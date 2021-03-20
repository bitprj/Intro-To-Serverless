let endpoint = undefined

endpoint = process.env.HTTP_ENDPOINT

if (endpoint == null) {
    throw new Error("You have not added your secrets!");
}