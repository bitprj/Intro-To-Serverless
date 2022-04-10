
const morse = require("morse-code-converter");
// npm install morse-code-converter

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let code = "Provide a value in the query parameter 'plaintext'";

    if (req.query.plaintext) {
        const english = (req.query.plaintext);
        code = morse.textToMorse(english);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code
    };
}

