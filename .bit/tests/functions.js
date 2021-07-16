const fs = require('fs') //get the methods in the fs package

const validateResponseStatus = (resp, uri) => {
    if(resp.status == 404){
        console.error(`Your function could not be found at "${uri}" check function url secret 🔍`);
        process.exit(1)
    }

    if(resp.status == 500){
        console.error("Your function has an error and could not be run 🐛");
        process.exit(1)
    }
}

const queryString = (uri) => {
    if(uri.indexOf("?") === -1) {
        uri = uri + "?x=1"
    }
    return uri
}

const checkSecret = (secret, secretName) => {
    if (!secret || !secret.trim()) {
        console.error(`You forgot to add your "${secretName}" secret!`);
        process.exit(1)
    }
}

const checkCommit = (commit_file) => {
    for(var i = 0; i < commit_file.length; i++) {
        var a = commit_file[i];
        fs.access(commit_file[i], err => {
            if (err) {
                console.error("You did not commit '" + a + "'")
                process.exit(1)
            }
        })
    }
}

exports.queryString = queryString
exports.validateResponseStatus = validateResponseStatus
exports.checkSecret = checkSecret
exports.checkCommit = checkCommit