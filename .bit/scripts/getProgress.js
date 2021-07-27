const args = require('minimist')(process.argv.slice(2))
const fetch = require('node-fetch');

async function main() {
    let step;
    const owner = args['owner'];
    const repo = args['repo'];

    const options = {
        headers: {
            repo,
            owner
        }
    }

    try {
        const resp = await fetch('https://counselorbot.azurewebsites.net/api/hasuraCountQuery?code=dWJdQz4o2bEoGesnmZDi9oi8/v7xk8NaVEU9ykgxC1xLPrCeAkd96A==', options);
        const data = await resp.json();
        step = data.step.data.users_progress[0].count;

        /*
            {
            "step": {
                "data": {
                "users_progress": [
                    {
                    "count": 1
                    },
                    {
                    "count": 0
                    }
                ]
                }
            }
            }
        */
    }
    catch (e) {
        step = "[ERROR] Something went wrong! ⚠️"
    }

    console.log(step)

}

main();

