const args = require('minimist')(process.argv.slice(2))
const functions = require('./functions');
const user = args['user'];
const repo = args['repo'];

async function main() {
    try { hello = require('./../../week1/helloworld.js') }
    catch (e) {
        await functions.throwError("Searching for 'helloworld.js'... file cannot be found", user, repo)
        console.log("Searching for 'helloworld.js'... file cannot be found");
        process.exit(1)
    }

    let helloworld = hello()
    let test_output = "Hello World"

    if (helloworld != test_output) {
        await functions.throwError(`Got: '${helloworld}', was expecting: '${test_output}'.`, user, repo)
        console.log(`Got: "${helloworld}", was expecting: "${test_output}".`)
        process.exit(1)
    }

    console.info("Yay! 🎉🎉🎉🎉🎉🎉🎉🍾")
}

main();
