const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
   event.preventDefault();
   
   const output = document.getElementById("output")
   if (document.getElementById("username").value != '') {
        output.textContent = "Thanks!"
    } else if (!document.getElementById("username").value.toLowerCase().endsWith(".jpg")) {
        alert("Invalid file type")
    } else {
        alert("No name has been given")
    }

});
