let endpoint = undefined

endpoint = process.env.FUNCTION_URL

if (endpoint[0] != "h") {
   throw new Error("You have not added your function url as a secret!");
}
