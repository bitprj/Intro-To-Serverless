module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');

    let responseValue = "Provide a value in the query parameter 'Password'.";

    if (req.query.password) {
        responseValue = req.query.password;
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseValue
    };
}
