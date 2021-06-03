async function getImage(event) {
    event.preventDefault()
    var myform = document.getElementById("myform")
    var payload = new FormData(myform);
    console.log(payload)
    if (document.getElementById("username").value != '') {
        $('#output').text("Thanks!")
  
        console.log("Posting your image...");
        const resp = await fetch("INSERT_FUNCTION_URL", {
            method: 'POST',
            headers: {
                'codename' : username
            },
            body: payload
        });
  
        var data = await resp.json();
        console.log(data);
        $('#output').text("Your image has been stored successfully!")
    } else {
        alert("No name error.")
    }
  }