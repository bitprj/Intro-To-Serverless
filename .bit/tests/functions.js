const fs = require('fs') //get the methods in the fs package

const getStatus = (resp, uri) => {
    if(resp.status == 404){
        console.log(`Your function could not be found at "${uri}" check function url secret 🔍`);
    }

    if(resp.status == 500){
        console.log("Your function has an error and could not be run 🐛");
    }
}

const queryString = (uri) => {
    if(uri.indexOf("?") === -1) {
        uri = uri + "?x=1"
    }
    return uri
}

const checkSecret = (secret, secretName) => {
    if (secret[0] == undefined) {
        throw new Error(`You forgot to add your ${secretName} secret!`);
    }
}

const checkCommit = (commit_file) => {
    for(var i = 0; i < commit_file.length; i++) {
        var a = commit_file[i];
        fs.access(commit_file[i], err => {
            if (err) {
                throw new Error("You did not commit '" + a + "'")
            }
        })
    }
}

exports.queryString = queryString
exports.getStatus = getStatus
exports.checkSecret = checkSecret
exports.checkCommit = checkCommit