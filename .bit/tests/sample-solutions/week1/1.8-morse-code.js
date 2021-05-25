const morse = require("morse-code-converter");
 
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const english = (req.query.plaintext);
    const code = morse.textToMorse(english);


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code
    };
}
