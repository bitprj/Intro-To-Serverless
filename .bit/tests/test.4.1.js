const cypress = require('cypress')
const functions = require('./functions');
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];

cypress
    .run({
        // the path is relative to the current working directory
        spec: './4.1.spec.js',
    })
    .then((results) => {
        console.log(results)
    })
    .catch(async (err) => {
        console.error("ERROR: " + err);
        await functions.throwError(err, user, repo)
    })
