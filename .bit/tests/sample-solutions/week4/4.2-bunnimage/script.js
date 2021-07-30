const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
   event.preventDefault();
   const payload = new FormData(bunnForm);

   const username = document.getElementById("username").value
   const output = document.getElementById("output")
   if (document.getElementById("username").value != '') {
        output.textContent = "Thanks!"
    } else {
        alert("No name error.")
    }
});
