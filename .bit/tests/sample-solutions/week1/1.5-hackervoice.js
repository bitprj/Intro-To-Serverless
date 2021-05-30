module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let result = ""
    const password = req.query.password;
  
    if (password == "letmein") {
      result = "Access granted."
    } else {
      result = "Access denied." 
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}
