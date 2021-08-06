const cypress = require('cypress')
const functions = require('./functions');
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];

cypress
    .run({
        // the path is relative to the current working directory
        spec: 'cypress/integration/4.1.spec.js',
    })
    .then(async (results) => {
        // console.log(results)
        let msg = `Total Failed: ${results.totalFailed} Total Passed: ${results.totalPassed}`
        await functions.throwError(msg, user, repo);
    })