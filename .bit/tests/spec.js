const cypress = require('cypress')
const functions = require('./functions');
const fetch = require('node-fetch');
const args = require('minimist')(process.argv.slice(2))
const user = args['user'];
const repo = args['repo'];
const spec = args['spec'];

console.log(spec)


cypress
    .run({
        // the path is relative to the current working directory
        spec: spec,
    })
    .then(async (results) => {
        // console.log(results)
        if (results.totalFailed > 0) {
            let msg = `Total Failed: ${results.totalFailed} Total Passed: ${results.totalPassed}`
            await functions.throwError(msg, user, repo);
        }

    })