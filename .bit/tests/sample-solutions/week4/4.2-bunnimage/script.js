function getImage(event) {
    event.preventDefault()
    var myform = document.getElementById("myform")
    var payload = new FormData(myform);
    console.log(payload)
    if (document.getElementById("username").value != '') {
        $('#output').text("Thanks!")
    } else {
        alert("No name error.")
    }
  }